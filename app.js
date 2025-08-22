const btn = document.querySelector('.talk')
const content = document.querySelector('.content')

function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();
    if(hour >= 0 && hour<12){
        speak("Good Morning Buddy!");
    }
    else if(hour >= 12 && hour<17){
        speak("Good afternoon Buddy!");
    }
    else{
        speak("Good evening Buddy!");
    }
}
window.addEventListener('load',()=>{
    speak("initializing JARVIS.. ");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex =event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', () =>{
    content.textContent = "Listening..."
    recognition.start();
})


function takeCommand(message){
     if (
        message.includes('what is your name') ||
        message.includes('who are you') ||message.includes('what will you do')||
        message.includes('your name') ){
        speak("My name is Jarvis I am a virtual assistant created by a human named Nivas I am here to assist you with various tasks and provide information How can I help you today?");
    }
    else if(message.includes('hey') || message.includes('hello')|| message.includes('hi') ){
        speak("hello Buddy! How can I help you?");
    }

    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
    else if(message.includes("open youtube")){
        window.open("https://www.youtube.com/", "_blank");
        speak("Opening youtube...")
    }
    else if(message.includes("open instagram")){
        window.open("https://instagram.com", "_blank");
        speak("Opening instagram...")
    }
    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
  
    } 
    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }

        else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }


}