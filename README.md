# 🦜 Duolingo Auto Extension

**Automação de lições do Duolingo + adição automática de gemas** direto do navegador.
Veja estatísticas em tempo real (lições, gemas, XP) no popup da extensão.

---

## 🔧 Instalação

### Via GitHub (qualquer navegador)

1. Clique em <kbd>Code</kbd> > <kbd>Download ZIP</kbd> no topo do repositório
2. Extraia a pasta `extension` para um local seguro
3. **No Chrome/Edge:**
   - Vá em `chrome://extensions/`
   - Ative **Modo desenvolvedor** (canto superior direito)
   - Clique em **Carregar sem compactação** e selecione a pasta `extension`
4. **No Firefox:**
   - Vá em `about:debugging#/runtime/this-firefox`
   - Clique em **Carregar temporariamente uma extensão** e selecione a pasta `extension`
5. Faça login no [Duolingo](https://www.duolingo.com/) e clique no ícone da extensão

---

## ⚙️ Configurações

- **Lições por execução**: Define quantas lições a extensão completará antes de parar
- **Iniciar/Parar**: Controle manual sobre a automação

*(A extensão para automaticamente quando atingir o limite de lições configurado!)*

---
## 📊 Estatísticas

| Métrica | Descrição |
|---------|-----------|
| **Lições completadas** | Número total de lições feitas automaticamente |
| **Gemas** | Gemas adicionadas na conta |
| **XP** | XP acumulado nas lições |

---
## 🛠️ Personalização (para desenvolvedores)

Abra a pasta `extension` no seu editor de código e edite:

- **`background.js`**: Lógica de adição de gemas
- **`utils.js`**: Lógica de automação das lições
- **`popup/popup.js`**: Lógica do popup

---
## 📜 Licença

[MIT License](LICENSE)

---
## 🤝 Contribuições

Abra uma **issue** ou envie um **pull request** para melhorias!
