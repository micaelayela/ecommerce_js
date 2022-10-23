const form = document.getElementById('form');
const botonEnviar = document.getElementById('boton-enviar')

botonEnviar.addEventListener('click',() => {
    fetch("https://formsubmit.co/ajax/micaelayela@gmail.com",{
        method: "POST",
        body: new FormData(e.target)
    })
    
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json=>{
    console.log(json);
    $response.innerHTML = `<p>${json.message}</p>`;
    $form.reset()
    })
    .catcher(err =>{
        console/log(err);
        let message = err.statusText || "Ocurrió un error";
        $fetch.innerHTML = `Error ${err.status}: ${message}</p>`;
    })
    .finally(()=> setTimeout(()=>{
        $response.innerHTML="";
        }, 3000));
})



c
