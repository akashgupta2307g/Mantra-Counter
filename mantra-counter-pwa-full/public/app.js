let counts={radha:0,krishna:0,ram:0};
const rec=new (window.SpeechRecognition||window.webkitSpeechRecognition)();
rec.continuous=true;
rec.lang="en-IN";

const beep=new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=");

rec.onresult=e=>{
 const t=e.results[e.results.length-1][0].transcript.toLowerCase();
 if(t.includes("radha")) counts.radha++;
 if(t.includes("krishna")) counts.krishna++;
 if(t.includes("ram")) counts.ram++;
 updateUI();
 navigator.vibrate?.(100);
 beep.play();
};

function updateUI(){
 document.getElementById("radha").innerText=counts.radha;
 document.getElementById("krishna").innerText=counts.krishna;
 document.getElementById("ram").innerText=counts.ram;
 drawChart();
}

function startListening(){rec.start();}

function drawChart(){
 const c=document.getElementById("chart");
 const ctx=c.getContext("2d");
 c.width=300;c.height=200;
 ctx.clearRect(0,0,300,200);
 const vals=Object.values(counts);
 const labels=["Radha","Krishna","Ram"];
 vals.forEach((v,i)=>{
  ctx.fillStyle="#4CAF50";
  ctx.fillRect(i*80+30,200-v*10,40,v*10);
  ctx.fillText(labels[i],i*80+30,190);
 });
}