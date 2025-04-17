const selectTags=document.querySelectorAll("select");
const translateBtn=document.querySelector("#transfer");
const fromText=document.querySelector("#from");
const toText=document.querySelector("#to");
const icons=document.querySelectorAll("img");

selectTags.forEach((tag,id)=>{
  
  for(const countriesCode in countries){
    let selected;
  if(id==0 && countriesCode=="en-GB"){
    selected= "selected";
  }else if(id==1 && countriesCode=="hi-IN" ){
    selected="selected";
  }
  let option= `<option value="${countriesCode}" ${selected}>${countries[countriesCode]}</option>`
    tag.insertAdjacentHTML("beforeend",option);
}
});


translateBtn.addEventListener('click',()=>{
  let text=fromText.value;
  let translateFrom=selectTags[0].value;
  let translateTo=selectTags[1].value;  
  
  const apiUrl=`https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
  
  fetch(apiUrl).then(res=>res.json()).then(data=>{
    toText.value=data.responseData.translatedText;
  });
  
  
});



icons.forEach((icon)=>{
  icon.addEventListener('click',({target})=>{
    if(target.classList.contains("copy")){
      
      if(target.id="from1"){
        navigator.clipboard.writeText(fromText.value);
        
      }else{
        navigator.clipboard.writeText(toText.value);
      }
      
      
      
      
    }else{
      
      let utterance;
      if(target.id=="from1"){
        utterance=new window.SpeechSynthesisUtterance(fromText.value);
        utterance.lang=selectTags[0].value.split('-');
      } else {
        utterance=new window.SpeechSynthesisUtterance(toText.value);
        utterance.lang=selectTags[1].value.split('-');
      }
      window.speechSynthesis.speak(utterance);
      
    }
    
    
    
  });
  
  
});