/* ============================================================
   Protótipo estático - Formulário de Solicitação de Internação
   (JS puro, sem dependências - dados mockados)
   ============================================================ */

/* ==================== Mocks ==================== */
const beneficiarios = [
  { value: "00320000084848849", label: "Ana Paula Silva" },
  { value: "00320000012345678", label: "Carlos Eduardo Souza" },
  { value: "00320000087654321", label: "Maria Fernanda Oliveira" },
  { value: "00320000055566677", label: "João Pedro Almeida" },
]

const prestadores = [
  { value: "22578", label: "HOSPITAL INFANTIL PEQUENO PRINCIPE", desc: "22578 - ASSOC HOSPIT DE PROT A INFANCIA DR RAUL CARNEIRO" },
  { value: "106329", label: "CLÍNICA DE ESPECIALIDADES PEQUENO PRÍNCIPE", desc: "106329 - JOSICLER MASSONI - MEDICO NAO COOPERADO" },
  { value: "106541", label: "CLINICA DE ESPECIALIDADES PEQUENO PRINCIPE ME", desc: "106541 - JOSICLER MASSONI ME" },
]

const cids = [
  { value: "K80", label: "K80 - Colelitíase" },
  { value: "E10", label: "E10 - Diabetes mellitus insulino-dependente" },
  { value: "I10", label: "I10 - Hipertensão essencial (primária)" },
  { value: "J18", label: "J18 - Pneumonia por microorganismo não especificado" },
  { value: "N20", label: "N20 - Calculose do rim e do ureter" },
]

const procedimentos = [
  { value: "31005128", label: "Colecistectomia sem Colangiografia" },
  { value: "31009352", label: "Laparotomia Exploratória" },
  { value: "31003079", label: "Apendicectomia" },
  { value: "30715016", label: "Herniorrafia Inguinal" },
  { value: "31005497", label: "Gastrectomia Parcial" },
]

const opmes = [
  { value: "76622720", label: "Cânula Debrid APC 4,5X130MM" },
  { value: "76627900", label: "Cânula Debrid CMA 5,5X130MM" },
  { value: "76610011", label: "Parafuso de Titânio 3,5MM" },
  { value: "76633455", label: "Placa Bloqueada para Fêmur" },
]

const fornecedores = [
  { value: "F001", label: "MedSupply Distribuidora de Materiais" },
  { value: "F002", label: "OrtoTech Materiais Cirúrgicos" },
  { value: "F003", label: "BioMed Curitiba Ltda" },
]

const fornecedoresHistorico = fornecedores.concat([
  { value: "H004", label: "Cirúrgica Paraná Comércio de OPME" },
  { value: "H005", label: "Endosurgical Importadora" },
])

const medicamentos = [
  { value: "90015363", label: "Arimdex 1 MG COM VD 28" },
  { value: "90021450", label: "Oxaliplatina 100 MG SOL INJ" },
  { value: "90018872", label: "Ciclofosfamida 1 G PÓ INJ" },
  { value: "90031205", label: "Doxorrubicina 50 MG SOL INJ" },
  { value: "90027418", label: "Paclitaxel 300 MG SOL INJ" },
]

const celularesHistorico = [
  { value: "C1", label: "(41) 99999-9999" },
  { value: "C2", label: "(41) 98888-7777" },
]

const emailsHistorico = [
  { value: "E1", label: "gassan.traya@unimedcuritiba.com.br" },
  { value: "E2", label: "gassan.traya@gmail.com" },
]

/* ==================== Helpers ==================== */
const $ = (sel) => document.querySelector(sel)

const somenteNumeros = (t) => t.replace(/\D/g, "")
const sanitizeCid = (t) => t.toUpperCase().replace(/[^A-Z0-9.]/g, "")
const decimal = (t) => t.replace(/[^0-9,]/g, "")

function mascaraCelular(t) {
  const d = t.replace(/\D/g, "").slice(0, 11)
  if (d.length === 0) return ""
  if (d.length <= 2) return "(" + d
  if (d.length <= 7) return "(" + d.slice(0, 2) + ") " + d.slice(2)
  return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7)
}

function numericInput(el) {
  el.addEventListener("input", () => (el.value = somenteNumeros(el.value)))
}

// Máscara decimal 999,99 (3 inteiros + 2 decimais) - peso e altura
function mascaraDecimal(t) {
  const v = t.replace(/[^0-9,]/g, "")
  const partes = v.split(",")
  const int = partes[0].slice(0, 3)
  if (partes.length === 1) return int
  return int + "," + partes.slice(1).join("").slice(0, 2)
}

// Campo de código: só números e, se o código existir, preenche a descrição
function bindCodigo(codEl, descEl, options) {
  codEl.addEventListener("input", () => {
    codEl.value = somenteNumeros(codEl.value)
    const m = options.find((o) => o.value === codEl.value)
    if (m) descEl.value = m.label
  })
}

/** Autocomplete com lupa: input dentro de .search-wrap */
function attachSearch(input, options, cfg) {
  cfg = cfg || {}
  const wrap = input.closest(".search-wrap")
  const list = document.createElement("div")
  list.className = "dropdown hidden"
  wrap.appendChild(list)

  function render() {
    const q = input.value.toLowerCase()
    const filtrados = options.filter((o) => o.label.toLowerCase().includes(q))
    list.innerHTML = ""
    filtrados.forEach((o) => {
      const b = document.createElement("button")
      b.type = "button"
      b.textContent = o.label
      if (o.desc) {
        const s = document.createElement("small")
        s.textContent = o.desc
        b.appendChild(s)
      }
      b.addEventListener("click", () => {
        input.value = o.label
        list.classList.add("hidden")
        if (cfg.onSelect) cfg.onSelect(o)
      })
      list.appendChild(b)
    })
    list.classList.toggle("hidden", filtrados.length === 0)
  }

  input.addEventListener("input", () => {
    if (cfg.sanitize) input.value = cfg.sanitize(input.value)
    if (cfg.onType) cfg.onType()
    render()
  })
  input.addEventListener("focus", render)
  document.addEventListener("mousedown", (e) => {
    if (!wrap.contains(e.target)) list.classList.add("hidden")
  })
}

function mostrarErros(id, erros) {
  const box = $("#" + id)
  box.innerHTML = ""
  erros.forEach((e) => {
    const p = document.createElement("p")
    p.textContent = e
    box.appendChild(p)
  })
  box.classList.toggle("hidden", erros.length === 0)
  return erros.length === 0
}

/* ==================== Steps / Fluxo ==================== */
let etapa = 1
let maiorEtapa = 1
let opmePrevisto = null // Campo 27
let quimioPrevisto = null // Campo 41
// Etapas efetivamente concluídas (validadas no Avançar) - recebem o check verde
const completadas = new Set()

// Abas condicionais ficam em cinza claro até a resposta ser SIM
function etapaDesabilitada(n) {
  if (n === 3) return opmePrevisto !== "sim"
  if (n === 4) return quimioPrevisto !== "sim"
  if (n === 5) return quimioPrevisto !== "sim"
  return false
}

function mostrarEtapa(n) {
  etapa = n
  document.querySelectorAll(".tab-pane").forEach((p, i) => {
    p.classList.toggle("hidden", i + 1 !== n)
  })
  renderSteps()
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Marca a etapa de origem como concluída e navega para o destino
function concluirEAvancar(origem, destino) {
  completadas.add(origem)
  maiorEtapa = Math.max(maiorEtapa, destino)
  mostrarEtapa(destino)
}

function renderSteps() {
  document.querySelectorAll(".step").forEach((btn) => {
    const n = Number(btn.dataset.n)
    const dis = etapaDesabilitada(n)
    const ativa = n === etapa
    // check verde apenas para etapas realmente concluídas (validadas)
    const done = !ativa && completadas.has(n) && !dis
    btn.classList.toggle("active", ativa)
    btn.classList.toggle("done", done)
    btn.classList.toggle("disabled", dis && !ativa)
    btn.disabled = dis || n > maiorEtapa || ativa
    btn.querySelector(".n").textContent = done ? "✓" : n
  })
}

document.querySelectorAll(".step").forEach((btn) => {
  btn.addEventListener("click", () => {
    const n = Number(btn.dataset.n)
    if (n !== etapa && n <= maiorEtapa && !etapaDesabilitada(n)) mostrarEtapa(n)
  })
})

/* ==================== Aba 1 - Dados da Internação ==================== */
// Campo 4: se o cartão existir, preenche o nome do beneficiário (Campo 5)
bindCodigo($("#t1-cartao"), $("#t1-benef"), beneficiarios)

attachSearch($("#t1-benef"), beneficiarios, {
  onType: () => ($("#t1-cartao").value = ""),
  onSelect: (o) => ($("#t1-cartao").value = o.value), // preenche o Campo 4
})

attachSearch($("#t1-prest"), prestadores, {
  onType: () => ($("#t1-prest-cod").value = ""),
  onSelect: (o) => ($("#t1-prest-cod").value = o.value), // preenche o Campo 12
})

;["t1-cid1", "t1-cid2", "t1-cid3"].forEach((id) => {
  attachSearch($("#" + id), cids, {
    sanitize: sanitizeCid,
    onSelect: (o) => ($("#" + id).value = o.value),
  })
})

$("#t1-next").addEventListener("click", () => {
  const erros = []
  if (!$("#t1-cartao").value.trim()) erros.push("Campo 4 - Informe o número do cartão do beneficiário.")
  if (!$("#t1-benef").value.trim()) erros.push("Campo 5 - Selecione o beneficiário.")
  if (!$("#t1-prest").value.trim() || !$("#t1-prest-cod").value)
    erros.push("Campo 13 - Selecione o prestador (Nome Hospital / Local Solicitado).")
  if (!$("#t1-tipo").value) erros.push("Campo 15 - Selecione o tipo de internação.")

  const ind = $("#t1-indicacao").value.trim()
  if (ind.length === 0) erros.push("Campo 18 - Indicação Clínica é obrigatória e não pode conter apenas espaços.")
  else if (ind.length < 5) erros.push("Campo 18 - Indicação Clínica deve ter no mínimo 5 caracteres.")
  else if (/(.)\1{4,}/.test(ind) || /^(.)\1*$/.test(ind))
    erros.push('Campo 18 - Indicação Clínica não pode conter sequências de caracteres repetidos (ex.: ".....", "999999").')

  if (mostrarErros("e1", erros)) concluirEAvancar(1, 2)
})

/* ==================== Aba 2 - Procedimentos ==================== */
const procRows = $("#proc-rows")

function addProcRow() {
  const row = document.createElement("div")
  row.className = "row cols-linha end linha-dinamica"
  row.innerHTML =
    '<div><label>Cód. Procedimento</label><input class="p-cod" /></div>' +
    '<div><label>Nome Procedimento</label><div class="search-wrap"><input class="p-nome" autocomplete="off" /></div></div>' +
    '<div><label>Qtde. Solicitado</label><input class="p-qtde" value="1" /></div>' +
    '<div class="acoes-linha">' +
    '<button type="button" class="btn-icon add" title="Clique para adicionar novos procedimentos">+</button>' +
    '<button type="button" class="btn-icon rem" title="Clique para remover procedimentos">&minus;</button>' +
    "</div>"
  procRows.appendChild(row)

  const cod = row.querySelector(".p-cod")
  // Campo 22: se o código existir, preenche o nome (Campo 23)
  bindCodigo(cod, row.querySelector(".p-nome"), procedimentos)
  numericInput(row.querySelector(".p-qtde"))
  attachSearch(row.querySelector(".p-nome"), procedimentos, {
    onType: () => (cod.value = ""),
    onSelect: (o) => (cod.value = o.value), // preenche o Campo 22
  })
  row.querySelector(".add").addEventListener("click", addProcRow)
  row.querySelector(".rem").addEventListener("click", () => {
    if (procRows.children.length > 1) row.remove()
    atualizarBotoesRemover(procRows)
  })
  atualizarBotoesRemover(procRows)
}

function atualizarBotoesRemover(container) {
  const soUma = container.children.length === 1
  container.querySelectorAll(".rem").forEach((b) => (b.disabled = soUma))
}

addProcRow()

function validarProcedimentos() {
  const erros = []
  Array.from(procRows.children).forEach((row, i) => {
    const n = i + 1
    const cod = row.querySelector(".p-cod").value
    const nome = row.querySelector(".p-nome").value
    const qtde = row.querySelector(".p-qtde").value
    if (!cod && !nome) {
      erros.push("Procedimento " + n + " - Informe o código (Campo 22) e o nome do procedimento (Campo 23).")
      return
    }
    if (!cod) erros.push("Procedimento " + n + " - Informe o código do procedimento (Campo 22).")
    if (!nome) erros.push("Procedimento " + n + " - Informe o nome do procedimento (Campo 23).")
    if (!qtde || Number(qtde) < 1)
      erros.push("Procedimento " + n + " - Quantidade solicitada deve ser um número maior que zero (Campo 24).")
  })
  return erros
}

function setConfirm(simBtn, naoBtn, valor) {
  simBtn.classList.toggle("selected", valor === "sim")
  naoBtn.classList.toggle("selected", valor === "nao")
}

// Campo 27 - apenas marca a resposta; o avanço acontece no botão Avançar
$("#opme-sim").addEventListener("click", () => {
  opmePrevisto = "sim"
  setConfirm($("#opme-sim"), $("#opme-nao"), opmePrevisto)
  $("#t2-next").textContent = "Avançar para OPME"
  $("#quimio-confirm-4").classList.add("hidden") // pergunta feita na aba OPME
  renderSteps()
})
$("#opme-nao").addEventListener("click", () => {
  opmePrevisto = "nao"
  setConfirm($("#opme-sim"), $("#opme-nao"), opmePrevisto)
  $("#t2-next").textContent = "Avançar para Quimioterapia"
  $("#quimio-confirm-4").classList.remove("hidden")
  renderSteps()
})

$("#t2-next").addEventListener("click", () => {
  const erros = validarProcedimentos()
  if (opmePrevisto === null) erros.push("Campo 27 - Informe se o procedimento prevê utilização de OPME.")
  if (!mostrarErros("e2", erros)) return
  concluirEAvancar(2, opmePrevisto === "sim" ? 3 : 4)
})

/* ==================== Aba 3 - OPME ==================== */
const opmeRows = $("#opme-rows")

function addOpmeRow() {
  const row = document.createElement("div")
  row.className = "linha-dinamica"
  row.innerHTML =
    '<div class="row cols-linha end">' +
    '<div><label>Cód. OPME</label><input class="o-cod" /></div>' +
    '<div><label>Descrição OPME</label><div class="search-wrap"><input class="o-desc" autocomplete="off" /></div></div>' +
    '<div><label>Qtde. Solicitado</label><input class="o-qtde" value="1" /></div>' +
    '<div class="acoes-linha">' +
    '<button type="button" class="btn-icon add" title="Clique para adicionar novo OPME">+</button>' +
    '<button type="button" class="btn-icon rem" title="Clique para remover OPME">&minus;</button>' +
    "</div></div>" +
    '<div class="campo-fornecedor"><label>Fornecedor</label>' +
    '<div class="search-wrap"><input class="o-forn" autocomplete="off" /></div></div>'
  opmeRows.appendChild(row)

  const cod = row.querySelector(".o-cod")
  // Campo 28: se o código existir, preenche a descrição (Campo 29)
  bindCodigo(cod, row.querySelector(".o-desc"), opmes)
  numericInput(row.querySelector(".o-qtde"))
  attachSearch(row.querySelector(".o-desc"), opmes, {
    onType: () => (cod.value = ""),
    onSelect: (o) => (cod.value = o.value), // preenche o Campo 28
  })
  attachSearch(row.querySelector(".o-forn"), fornecedores, {})
  row.querySelector(".add").addEventListener("click", addOpmeRow)
  row.querySelector(".rem").addEventListener("click", () => {
    if (opmeRows.children.length > 1) row.remove()
    atualizarBotoesRemover(opmeRows)
  })
  atualizarBotoesRemover(opmeRows)
}

addOpmeRow()

// Campo 33 - exibe/oculta a seção OPME Não Cadastrado
$("#opme-nc").addEventListener("change", (e) => {
  $("#nc-section").classList.toggle("hidden", !e.target.checked)
})

numericInput($("#nc-qtde"))
;["nc-f1", "nc-f2", "nc-f3"].forEach((id) => {
  attachSearch($("#" + id), fornecedoresHistorico, {})
})

$("#t3-next").addEventListener("click", () => {
  const erros = []
  Array.from(opmeRows.children).forEach((row, i) => {
    const n = i + 1
    if (!row.querySelector(".o-cod").value) erros.push("OPME " + n + " - Informe o código do OPME (Campo 28).")
    if (!row.querySelector(".o-desc").value) erros.push("OPME " + n + " - Informe a descrição do OPME (Campo 29).")
    const qtde = row.querySelector(".o-qtde").value
    if (!qtde || Number(qtde) < 1)
      erros.push("OPME " + n + " - Quantidade solicitada deve ser um número maior que zero (Campo 30).")
    if (!row.querySelector(".o-forn").value) erros.push("OPME " + n + " - Selecione o fornecedor (Campo 32).")
  })

  if ($("#opme-nc").checked) {
    const qtde = $("#nc-qtde").value
    if (!qtde || Number(qtde) < 1)
      erros.push("OPME Não Cadastrado - Quantidade solicitada deve ser um número maior que zero (Campo 36).")
    if (!$("#nc-nome").value.trim())
      erros.push("OPME Não Cadastrado - Informe o nome e as especificações do OPME (Campo 37).")
    if (!$("#nc-f1").value.trim())
      erros.push("OPME Não Cadastrado - Informe o primeiro fornecedor (Campo 38).")
    if (!$("#nc-just").value.trim())
      erros.push("OPME Não Cadastrado - Informe a justificativa do OPME não cadastrado.")
  }

  // Campo 41 - Utilização de Quimioterápico
  if (quimioPrevisto === null)
    erros.push("Campo 41 - Informe se o procedimento prevê utilização de Quimioterápico.")

  if (mostrarErros("e3", erros)) concluirEAvancar(3, quimioPrevisto === "sim" ? 4 : 6)
})

/* ==================== Aba 4 - Quimioterapia ==================== */
// Superfície corporal (Mosteller) calculada a partir de peso/altura, mas editável
function recalcularSuperficie() {
  const p = parseFloat($("#q-peso").value.replace(",", "."))
  const a = parseFloat($("#q-altura").value.replace(",", "."))
  if (p > 0 && a > 0) $("#q-sup").value = Math.sqrt((p * a) / 3600).toFixed(2).replace(".", ",")
}

$("#q-peso").addEventListener("input", (e) => { e.target.value = mascaraDecimal(e.target.value); recalcularSuperficie() })
$("#q-altura").addEventListener("input", (e) => { e.target.value = mascaraDecimal(e.target.value); recalcularSuperficie() })
// Superfície corporal: calculada automaticamente (campo desabilitado)
// Idade: somente números, máximo 3 dígitos
$("#q-idade").addEventListener("input", (e) => {
  e.target.value = somenteNumeros(e.target.value).slice(0, 3)
})

;["q-cid1", "q-cid2", "q-cid3"].forEach((id) => {
  attachSearch($("#" + id), cids, {
    sanitize: sanitizeCid,
    onSelect: (o) => ($("#" + id).value = o.value),
  })
})

// Campo 41 - apenas marca a resposta (nas duas caixas, aba OPME e aba Quimio);
// o avanço acontece somente no botão Avançar
function setQuimio(valor) {
  quimioPrevisto = valor
  setConfirm($("#quimio-sim"), $("#quimio-nao"), valor)
  setConfirm($("#quimio-sim-opme"), $("#quimio-nao-opme"), valor)
  $("#quimio-form").classList.toggle("hidden", valor !== "sim")
  $("#t4-next").textContent =
    valor === "sim" ? "Avançar para Medicamentos" : "Avançar para Cooperado e Anexos"
  $("#t3-next").textContent =
    valor === "sim" ? "Avançar para Quimioterapia" : "Avançar para Cooperado e Anexos"
  mostrarErros("e4", [])
  renderSteps()
}
$("#quimio-sim").addEventListener("click", () => setQuimio("sim"))
$("#quimio-nao").addEventListener("click", () => setQuimio("nao"))
$("#quimio-sim-opme").addEventListener("click", () => setQuimio("sim"))
$("#quimio-nao-opme").addEventListener("click", () => setQuimio("nao"))

$("#t4-back").addEventListener("click", () => mostrarEtapa(opmePrevisto === "sim" ? 3 : 2))

$("#t4-next").addEventListener("click", () => {
  const erros = []
  if (quimioPrevisto === null) {
    erros.push("Campo 41 - Informe se o procedimento prevê utilização de Quimioterápico.")
  } else if (quimioPrevisto === "sim") {
    if (!$("#q-data").value) erros.push("Campo 42 - Informe a data do diagnóstico.")
    if (!$("#q-estadiamento").value) erros.push("Campo 46 - Selecione o estadiamento.")
    if (!$("#q-tipo").value) erros.push("Campo 47 - Selecione o tipo de quimioterapia.")
    if (!$("#q-finalidade").value) erros.push("Campo 48 - Selecione a finalidade.")
    if (!$("#q-tumor").value) erros.push("Campo 49 - Selecione o tumor.")
    if (!$("#q-nodulo").value) erros.push("Campo 50 - Selecione o nódulo.")
    if (!$("#q-metastase").value) erros.push("Campo 51 - Selecione a metástase.")
    if (!$("#q-ecog").value) erros.push("Campo 52 - Selecione o ECOG.")
    if (!$("#q-plano").value.trim()) erros.push("Campo 53 - Informe o plano terapêutico.")
    if (!$("#q-diag").value.trim()) erros.push("Campo 54 - Informe o diagnóstico cito/histopatológico.")
  }
  if (!mostrarErros("e4", erros)) return
  concluirEAvancar(4, quimioPrevisto === "sim" ? 5 : 6)
})

/* ==================== Aba 5 - Medicamentos ==================== */
// Campo 57: se o código existir, preenche a descrição (Campo 58)
bindCodigo($("#m-cod"), $("#m-desc"), medicamentos)
numericInput($("#m-doses"))
numericInput($("#m-ciclos"))
numericInput($("#m-ciclo-atual"))
numericInput($("#m-intervalo"))
numericInput($("#m-dias"))

attachSearch($("#m-desc"), medicamentos, {
  onType: () => ($("#m-cod").value = ""),
  onSelect: (o) => ($("#m-cod").value = o.value), // preenche o Campo 57
})

$("#t5-next").addEventListener("click", () => {
  const erros = []
  if (!$("#m-cod").value) erros.push("Campo 57 - Informe o código do medicamento.")
  if (!$("#m-desc").value.trim()) erros.push("Campo 58 - Informe a descrição do medicamento.")
  const doses = $("#m-doses").value
  if (!doses || Number(doses) < 1) erros.push("Campo 59 - Quantidade de doses deve ser um número maior que zero.")
  if (!$("#m-via").value.trim()) erros.push("Campo 60 - Informe a via de administração.")
  if (!$("#m-freq").value.trim()) erros.push("Campo 61 - Informe a frequência.")
  if (!$("#m-unidade").value) erros.push("Campo 62 - Selecione a unidade de medida.")
  if (!$("#m-area").value.trim()) erros.push("Campo 64 - Informe a área irradiada.")
  if (!$("#m-ciclos").value) erros.push("Campo 68 - Informe o número de ciclos previstos.")
  if (!$("#m-ciclo-atual").value) erros.push("Campo 69 - Informe o ciclo atual.")
  if (!$("#m-intervalo").value) erros.push("Campo 70 - Informe o intervalo entre ciclos (em dias).")
  if (!$("#m-dias").value) erros.push("Campo 71 - Informe os dias do ciclo atual.")

  if (mostrarErros("e5", erros)) concluirEAvancar(5, 6)
})

/* ==================== Aba 6 - Cooperado e Anexos ==================== */
attachSearch($("#c-celular"), celularesHistorico, { sanitize: mascaraCelular })
attachSearch($("#c-email"), emailsHistorico, {})

const fileInput = $("#file-input")
const fileList = $("#file-list")
let arquivos = []
let proximoArquivoId = 1

$("#attach-btn").addEventListener("click", () => fileInput.click())

fileInput.addEventListener("change", () => {
  Array.from(fileInput.files || []).forEach((f) => {
    arquivos.push({ id: proximoArquivoId++, nome: f.name, tamanho: f.size })
  })
  fileInput.value = "" // permite anexar o mesmo arquivo novamente
  renderArquivos()
})

function formatarTamanho(bytes) {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

function renderArquivos() {
  fileList.innerHTML = ""
  arquivos.forEach((a) => {
    const li = document.createElement("li")
    li.className = "file-pill"
    const name = document.createElement("span")
    name.className = "name"
    name.textContent = a.nome + " "
    const size = document.createElement("span")
    size.className = "size"
    size.textContent = "(" + formatarTamanho(a.tamanho) + ")"
    name.appendChild(size)
    const trash = document.createElement("button")
    trash.type = "button"
    trash.className = "trash"
    trash.title = "Excluir anexo"
    trash.innerHTML =
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/><line x1="10" y1="11.5" x2="10" y2="17"/><line x1="14" y1="11.5" x2="14" y2="17"/></svg>'
    trash.addEventListener("click", () => {
      arquivos = arquivos.filter((x) => x.id !== a.id)
      renderArquivos()
    })
    li.appendChild(name)
    li.appendChild(trash)
    fileList.appendChild(li)
  })
}

$("#t6-back").addEventListener("click", () =>
  mostrarEtapa(quimioPrevisto === "sim" ? 5 : opmePrevisto === "sim" ? 3 : 4)
)

$("#t6-enviar").addEventListener("click", () => {
  const erros = []
  if (!/^\(\d{2}\) \d{5}-\d{4}$/.test($("#c-celular").value))
    erros.push("Campo 73 - Informe o celular de contato no formato (XX) XXXXX-XXXX.")
  const email = $("#c-email").value
  if (!email.trim()) erros.push("Campo 74 - Informe o e-mail de contato.")
  else if (!email.includes("@")) erros.push("Campo 74 - E-mail inválido: deve conter o caractere @.")
  if (arquivos.length === 0)
    erros.push("Campo 75 - Anexe ao menos um exame/documento que comprove a necessidade do procedimento.")

  if (!mostrarErros("e6", erros)) return

  // Campo 1 - sequencial gerado pelo sistema (mock)
  $("#num-solicitacao").textContent = String(Date.now()).slice(-6)
  $("#form-card").classList.add("hidden")
  $("#success").classList.remove("hidden")
  window.scrollTo({ top: 0, behavior: "smooth" })
})

/* ==================== Inicialização ==================== */
renderSteps()
