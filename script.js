let speech = new SpeechSynthesisUtterance();
let addVoices = [];
let voiceSelect = document.querySelector("select");
let isPlaying = false;

window.speechSynthesis.onvoiceschanged = () => {
    addVoices = window.speechSynthesis.getVoices();
    speech.voice = addVoices[0];
    addVoices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};
voiceSelect.addEventListener('change', () => {
    speech.voice = addVoices[voiceSelect.value];
})
// play/pause functionality..
const playPauseButton = document.getElementById('playPauseButton');
// const stopButton = document.getElementById('stopButton');

playPauseButton.addEventListener('click', () => {
    if(!isPlaying){
        window.speechSynthesis.cancel();
        speech.text = document.getElementById('text').value;
        window.speechSynthesis.speak(speech);
        playPauseButton.innerHTML = `<img src="assets/pauseIcon.svg" alt="Pause Icon"> Pause`;
        isPlaying = true;
    }
    else{
        if(window.speechSynthesis.paused){
            window.speechSynthesis.resume();
            playPauseButton.innerHTML = `<img src="assets/pauseIcon.svg" alt= "Pause Icon"> Pause`;
        }
        else{
            window.speechSynthesis.pause();
            playPauseButton.innerHTML = `<img src="assets/playIcon.svg" alt= "Play Icon"> Resume`;
        }
    }
});

// reset play/pause button on end..
speech.onend = function(){
    playPauseButton.innerHTML = '<img src="assets/playIcon.svg" alt="Play Icon">Listen';
    isPlaying = false;
}