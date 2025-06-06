import { loadCompo } from "./global.js"

const prontuario = {
  medico: "Adriano Imperador",
  horario: "16:20",
  queixaPrincipal: "Dor na barriga",
  historiaMolestia: `Há mais ou menos 20 dias, evolui com desconforto abdominal constante que piora com café e comidas ácidas. Se permanece longos períodos em jejum, também sente o aumento da dor. Relata aumento da halitose.`,
  historicoAntecedentes: "Não relata internações anteriores e cirurgias prévias.",
  exameFisico: `BNF sem SA
  MUV sem alterações
  Dor à palpação de região epigástrica, halitose
  edema de MMII / 4+`,
  hipoteseDiagnostica: "• K29 • Gastrite e duodenite",
  condutas: `solicito EDA
  Phimetra
  e exames laboratoriais`,
  prescricao: "Annita de 12/12hrs por 3 dias"
};


function calcularIdade(dataNascimentoStr) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimentoStr);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

document.addEventListener("DOMContentLoaded", () => {
  loadCompo('../components/aside.html', '.sidebar');

  const dadosPaciente = sessionStorage.getItem("pacienteSelecionado");
  if (!dadosPaciente) return;
 
  const paciente = JSON.parse(dadosPaciente);

  // Atualizar nome do paciente na interface
  const nomeElemento = document.getElementById("nome-paciente");
  if (nomeElemento) {
    nomeElemento.textContent = paciente.nome;
  }

  const idadeElemento = document.getElementById("idade-paciente");
  if (idadeElemento && paciente.data_nascimento) {
    const idade = calcularIdade(paciente.data_nascimento);
    idadeElemento.textContent = `idade: ${idade} anos`;
  }  

  // Re-renderizar a visualização
  renderizarProntuario(prontuario);
});

// Endereça para os pacientes do dia 
document.body.addEventListener('click', function(e) {
  if (e.target.closest('.PacientesDiaConteiner')) {
    window.location.href = "../index.html";
  }
});

// Endereça para a tela de cadastro 
document.querySelector('.btn').addEventListener('click', () => {
  window.location.href = "../pages/rapSheet.html";
});

function renderizarProntuario(data) {
  document.getElementById("medico-responsavel").textContent = `Por: ${data.medico}`;
  document.getElementById("registro-hora").textContent = `🕒 ${data.horario}`;

  const body = document.getElementById("record-body");
  body.innerHTML = `
    <p><strong>Queixa principal:</strong><br />${data.queixaPrincipal}</p>
    <p><strong>História da moléstia atual:</strong><br />${data.historiaMolestia}</p>
    <p><strong>Histórico e antecedentes:</strong><br />${data.historicoAntecedentes}</p>
    <p><strong>Exame físico:</strong><br />${data.exameFisico.replace(/\n/g, '<br />')}</p>
    <p><strong>Hipótese diagnóstica:</strong><br />${data.hipoteseDiagnostica}</p>
    <p><strong>Condutas:</strong><br />${data.condutas.replace(/\n/g, '<br />')}</p>
    <p><strong>Prescrevo:</strong><br />${data.prescricao}</p>
  `;
}

document.getElementById("open-form").addEventListener("click", () => {
  const body = document.getElementById("record-body");

  body.innerHTML = `
    <label>Queixa principal:<br><textarea id="edit-queixa">${prontuario.queixaPrincipal}</textarea></label><br>
    <label>História da moléstia atual:<br><textarea id="edit-historia">${prontuario.historiaMolestia}</textarea></label><br>
    <label>Histórico e antecedentes:<br><textarea id="edit-historico">${prontuario.historicoAntecedentes}</textarea></label><br>
    <label>Exame físico:<br><textarea id="edit-exame">${prontuario.exameFisico}</textarea></label><br>
    <label>Hipótese diagnóstica:<br><textarea id="edit-hipotese">${prontuario.hipoteseDiagnostica}</textarea></label><br>
    <label>Condutas:<br><textarea id="edit-condutas">${prontuario.condutas}</textarea></label><br>
    <label>Prescrevo:<br><textarea id="edit-prescricao">${prontuario.prescricao}</textarea></label><br>
    <button id="salvar-prontuario" class="btn primary">Salvar</button>
    <button id="cancelar-edicao" class="btn secondary">Cancelar</button>
  `;

  // Ajustar botões
  document.getElementById("open-form").style.display = "none";

  document.getElementById("cancelar-edicao").addEventListener("click", () => {
    renderizarProntuario(prontuario);
    document.getElementById("open-form").style.display = "inline-block";
  });

  document.getElementById("salvar-prontuario").addEventListener("click", async () => {
  // Atualiza o objeto prontuario com os valores atuais
  prontuario.queixaPrincipal = document.getElementById("edit-queixa").value;
  prontuario.historiaMolestia = document.getElementById("edit-historia").value;
  prontuario.historicoAntecedentes = document.getElementById("edit-historico").value;
  prontuario.exameFisico = document.getElementById("edit-exame").value;
  prontuario.hipoteseDiagnostica = document.getElementById("edit-hipotese").value;
  prontuario.condutas = document.getElementById("edit-condutas").value;
  prontuario.prescricao = document.getElementById("edit-prescricao").value;

  // Mostra botão de editar novamente
  document.getElementById("open-form").style.display = "inline-block";

  // Salva localmente no sessionStorage
  sessionStorage.setItem("prontuario", JSON.stringify(prontuario));

  // Envia para backend (API)
  try {
    // Pega o paciente selecionado do sessionStorage (onde você guarda o paciente do dia)
    const pacienteSelecionado = JSON.parse(sessionStorage.getItem("pacienteSelecionado"));
    if (!pacienteSelecionado || !pacienteSelecionado.id) {
      alert("Paciente não selecionado ou inválido");
      return;
    }

    const response = await fetch("http://localhost:3000/api/prontuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paciente_id: pacienteSelecionado.id,  // Ajuste esse campo se necessário
        queixa_principal: prontuario.queixaPrincipal,
        historia_molestia: prontuario.historiaMolestia,
        antecedentes: prontuario.historicoAntecedentes,
        exame_fisico: prontuario.exameFisico,
        hipotese_diagnostica: prontuario.hipoteseDiagnostica,
        condutas: prontuario.condutas,
        prescricao: prontuario.prescricao,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert("Erro ao salvar prontuário: " + (errorData.error || "Erro desconhecido"));
      return;
    }

    const result = await response.json();
    alert("Prontuário salvo com sucesso! ID: " + result.id);

    // Atualiza a tela mostrando os dados salvos
    renderizarProntuario(prontuario);

  } catch (err) {
    console.error(err);
    alert("Erro na comunicação com o servidor");
  }
});
});
