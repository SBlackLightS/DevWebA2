from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
import jwt
import datetime

# uvicorn main:app --reload

# --- CONFIGURAÇÕES DE AUTENTICAÇÃO (JWT) ---
SECRET_KEY = "senha_super_secreta_nexus"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app = FastAPI()

# --- DADOS EM MEMÓRIA (Persistência em Listas) ---
produtos_db = [
    {"id": "p1", "nome": "Metanfetamina Azul", "quantidade": 50000, "pureza_percentual": 99.1, "fornecedor": "Heisenberg"},
    {"id": "p2", "nome": "Maconha Prensada", "quantidade": 200000, "pureza_percentual": 20.0, "fornecedor": "Zé Pequeno"}
]
vendas_db = []

# --- SCHEMAS (Pydantic) ---
# Modelos para Produto
class Produto(BaseModel):
    id: str
    nome: str
    quantidade: float
    pureza_percentual: float
    fornecedor: str

# Modelos para Venda
class VendaIn(BaseModel):
    id_venda: str
    nome_produto: str
    id_comprador: str
    peso_por_unidade_g: float
    quantidade_unidades: int

# --- FUNÇÃO DE VALIDAÇÃO DO TOKEN ---
def get_usuario_logado(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Credenciais inválidas")
        return username
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")

# ==========================================
# ENDPOINT DE LOGIN (Gera o JWT)
# ==========================================
@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Simulação simples de usuário e senha (admin/admin)
    if form_data.username == "admin" and form_data.password == "admin":
        expiracao = datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
        token_jwt = jwt.encode({"sub": form_data.username, "exp": expiracao}, SECRET_KEY, algorithm=ALGORITHM)
        return {"access_token": token_jwt, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Usuário ou senha incorretos")

# ==========================================
# ENDPOINTS DE PRODUTO
# ==========================================

# 1. GET Produtos (AGORA PROTEGIDO)
@app.get("/produtos")
def listar_produtos(usuario: str = Depends(get_usuario_logado)):
    """
    Retorna a lista de produtos apenas para usuários autenticados.
    """
    return produtos_db

# 2. POST Produtos (PROTEGIDO)
@app.post("/produtos")
def criar_produto(produto: Produto, usuario: str = Depends(get_usuario_logado)):
    produtos_db.append(produto.model_dump())
    return {"mensagem": f"Produto cadastrado com sucesso por {usuario}", "produto": produto}

# ==========================================
# ENDPOINTS DE VENDA
# ==========================================
# 3. GET Vendas (PROTEGIDO)
@app.get("/vendas")
def listar_vendas(usuario: str = Depends(get_usuario_logado)):
    return vendas_db

# 4. POST Vendas (PROTEGIDO)
@app.post("/vendas")
def registrar_venda(venda: VendaIn, usuario: str = Depends(get_usuario_logado)):
    vendas_db.append(venda.model_dump())
    return {"mensagem": "Operação registrada com sucesso.", "venda": venda}