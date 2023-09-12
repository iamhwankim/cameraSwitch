let state = 0; // 0: photo available 1: photo taken
let switcher = 0; // 0:front 1:rear
let camera;
let backBtn;
let captureBtn;
let switchBtn;
let stillShot;

let rearSetting;
let frontSetting;

function setup() {
  //pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  
  backBtn = createButton('Back');
  backBtn.position(10,10);
  backBtn.size(250,60);
  backBtn.mouseReleased(backAction);
  captureBtn = createButton('Capture');
  captureBtn.position(width/2 - 125,10);
  captureBtn.size(250,60);
  captureBtn.mouseReleased(takePhoto);
  switchBtn = createButton('Switch');
  switchBtn.position(width-250,10);
  switchBtn.size(250,60);
  switchBtn.mouseReleased(switchCam)
  
  stillShot = createGraphics(windowWidth, windowHeight);
  
  rearSetting = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment" //rear camera
      }
    }
  }
  
  frontSetting = {
    audio: false,
    video: {
      facingMode: {
        exact: "user" //front camera
      }
    }
  }
  
  camera = createCapture(frontSetting);
  camera.hide();
  
  
}

function draw() {
  background(220);
  if(status == 0){
    image(camera,0,0,width,height); //라이브 영상 재생
  }else if(status == 1){
    image(stillShot,0,0,width,height); //촬영된 사진 디스플레이
  }
}

function backAction(){
  status = 0;
}
function takePhoto(){
  status = 1;
  stillShot.image(camera, 0,0,width,height);
}
function switchCam(){
  if(switcher == 0){
    switcher = 1;
    camera.remove();
    camera = createCapture(rearSetting);
    camera.hide();
  }else if(switcher == 1){
    switcher = 0;
    camera.remove();
    camera = createCapture(frontSetting);
    camera.hide();
  }
}