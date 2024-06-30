const concertText = `Natenczas Wojski chwycił na taśmie przypięty Swój róg bawoli, długi, cętkowany, kręty Jak wąż boa, oburącz do ust go przycisnął, Wzdął policzki jak banię, w oczach krwią zabłysnął, Zasunął wpół powieki, wciągnął w głąb pół brzucha I do płuc wysłał z niego cały zapas ducha, I zagrał: róg jak wicher, wirowatym dechem Niesie w puszczę muzykę i podwaja echem.
Umilkli strzelcy, stali szczwacze zadziwieni Mocą, czystością, dziwną harmoniją pieni. Starzec cały kunszt, którym niegdyś w lasach słynął, Jeszcze raz przed uszami myśliwców rozwinął; Napełnił wnet, ożywił knieje i dąbrowy, Jakby psiarnię w nie wpuścił i rozpoczął łowy.
Bo w graniu była łowów historyja krótka: Zrazu odzew dźwięczący, rześki: to pobudka; Potem jęki pojękach skomlą: to psów granie; A gdzieniegdzie ton twardszy jak grzmot: to strzelanie.`;

const stylesForm = document.getElementById('stylesForm');
const setStyleButton = document.getElementById('setStyleButton');
const deleteStyleButton = document.getElementById('deleteStyleButton');
const addContentButton = document.getElementById('addContentButton');
const mainContent = document.getElementById('mainContent');

setStyleButton.addEventListener('click', () => {
    document.body.classList.add('styled');
});

deleteStyleButton.addEventListener('click', () => {
    document.body.classList.remove('styled');
});

let paragraphIndex = 0;
addContentButton.addEventListener('click', () => {
    const paragraph = document.createElement('p');
    paragraph.textContent = concertText.split('\n')[paragraphIndex++];
    mainContent.appendChild(paragraph);

    if (paragraphIndex === concertText.split('\n').length) {
        addContentButton.disabled = true;
    }
});
