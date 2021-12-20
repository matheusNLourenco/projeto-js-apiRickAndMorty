const container = document.querySelector('.container');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const singleCharacter = document.getElementById('single-character');

fetch(`https://rickandmortyapi.com/api/character/`)
  .then(response => response.json())
  .then(data => {
    console.log(data)

    container.innerHTML = data.results.map(item => `
            
    <div class="character" data-id = ${item.id}>

      <img src="${item.image}" alt="">

      <div class="overlay">

        <h2>${item.name}</h2>

      </div>

    </div>
    
    `).join('');
  })

let counter = 1;
next.addEventListener('click', () => {

    fetch(`https://rickandmortyapi.com/api/character/?page=${counter >= 42 ? counter = 1 : ++counter}`)
        .then(res => res.json())
        .then(data => {

            container.innerHTML = data.results.map(item => `
            
            <div class="character" data-id = ${item.id}>

              <img src="${item.image}" alt="">

              <div class="overlay">

                <h2>${item.name}</h2>

              </div>

            </div>
            
            `).join('');
        })
});

prev.addEventListener('click', () => {

  fetch(`https://rickandmortyapi.com/api/character/?page=${counter <= 1 ? counter = 42 : --counter}`)
      .then(res => res.json())
      .then(data => {

          container.innerHTML = data.results.map(item => `
            
            <div class="character" data-id = ${item.id}>

              <img src="${item.image}" alt="">

              <div class="overlay">
              
                <h2>${item.name}</h2>

              </div>

            </div>
          
          `).join('');
      });
});

container.addEventListener('click', (e)=> {
  const character = e.path.find(item=> {
    if(item.classList) {
      return item.classList.contains('character')
    }
  })

  if(character) {
    const characterID = character.getAttribute('data-id')

    getCharacterById(characterID)
  }
})

function getCharacterById(character) {
  fetch(`https://rickandmortyapi.com/api/character/${character}`)
    .then(response => response.json())
    .then(data =>  {
      openModal(data)

      console.log(data)
    })
}

function openModal(data) {
  singleCharacter.innerHTML = `

    <div class="modal">
      <img src="${data.image}" />
    </div>
  `
}

window.addEventListener('click', (e)=> {
  if(e.target.classList.contains('modal')){
    e.target.style = 'display: none'
  }
})