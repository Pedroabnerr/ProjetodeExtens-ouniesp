admin = [
    {"0202":'sla'},
    {"0202ert":'slj5ytrja'},
    {"0202ret":'sldfgta'},
    {"02tert02":'slaytj'},
]

var res = document.querySelector('.res')

function verify(){
    let login = document.querySelector('.login').value
    let password = document.querySelector('.password').value

    let r = false

    for(let i=0; i<admin.length;i++){
        for(let key in admin[i]){
            if(key == login){
                if (admin[i][key] == password){
                    r = true
                    window.location.href = "pag_html/agenda.html"
                    break
                }
            }
        }
    }

    if(!r){
        res.innerHTML = `não foi encontrado `
    }

}