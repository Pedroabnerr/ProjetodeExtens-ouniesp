var patients = [
    { "Luiz Souza": "14:00" },
    { "Maria Oliveira": "14:30" },
    { "Carlos Lima": "15:00" },
    { "Ana Paula": "15:30" }
  ];

let input = document.querySelector('.search_input')
let res = document.querySelector('.res')
  
input.addEventListener('keydown', (event) => {
    if(event.key == 'Enter'){
        event.preventDefault()
        let inputValue = input.value
        let found = false
    
        for (let i = 0; i < patients.length; i++) {
            let patientName = Object.keys(patients[i])[0]
            let patientHours = patients[i][patientName]

            if (patientName.toLowerCase() == inputValue.toLowerCase()) {
                res.innerHTML = `Achamos!, o paciente ${patientName} está agendado para as ${patientHours} horas`
                found = true
                break
            }
        }

        if (!found) {
            res.innerHTML = "Paciente não encontrado"
        }

        input.value = ''
        } 
})
  