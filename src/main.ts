import {
  requestActivity,
  requestActivityRandom,
} from "./Providers/ProviderActivitiy";
import { Activity } from "./Interfaces/Activity.interface";
import { ActivityPhoto } from "./Interfaces/ActivityPhoto.interface";
import { requestPhoto } from "./Providers/ProviderPhotoActivity";
import Swal from "sweetalert2";


let activity: Activity = await requestActivityRandom();

let urlPhoto: ActivityPhoto = await requestPhoto(activity.type);

const imageActivity: HTMLImageElement = document.getElementById(
  "imagenActivity"
) as HTMLImageElement;
const activityDOM: HTMLSpanElement = document.getElementById(
  "activity"
) as HTMLSpanElement;
const typeDOM: HTMLSpanElement = document.getElementById(
  "type"
) as HTMLSpanElement;
const priceDOM: HTMLSpanElement = document.getElementById(
  "price"
) as HTMLSpanElement;
const participantsDOM: HTMLSpanElement = document.getElementById(
  "participants"
) as HTMLSpanElement;
const accessibilityDOM: HTMLSpanElement = document.getElementById(
  "accessibility"
) as HTMLSpanElement;

//Actividad por defecto
imageActivity.setAttribute("src", urlPhoto.results[0].urls.regular);
activityDOM.innerHTML = activity.activity;
typeDOM.innerHTML = activity.type;
priceDOM.innerHTML =
  getPriceString(activity.price) + " (" + activity.price.valueOf() + "€) ";
participantsDOM.innerHTML = activity.participants.toString();
accessibilityDOM.innerHTML = getAccessibilityString(activity.accessibility);

const filterForm: HTMLFormElement = document.getElementById(
  "filterForm"
) as HTMLFormElement;

filterForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const priceForm: HTMLSelectElement = document.getElementById("priceForm") as HTMLSelectElement;
  const participantsForm: HTMLInputElement = document.getElementById("participantsForm") as HTMLInputElement;
  const accessibilityForm: HTMLSelectElement = document.getElementById("accessibilityForm") as HTMLSelectElement;
  
  if(priceForm.value===""||participantsForm.value===""||accessibilityForm.value===""){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must fill all the fields!',
   
      });
  }else{
 //Llamamos a la API
  activity = await requestActivity(parseInt(participantsForm.value), priceForm.value, accessibilityForm.value);
  urlPhoto= await requestPhoto(activity.type);


  if (activity.activity === undefined) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There aren\'t activities with those parameters!',
   
      });
    }
  //Pintamos los datos
  imageActivity.setAttribute("src", urlPhoto.results[0].urls.regular);
  activityDOM.innerHTML = activity.activity;
  typeDOM.innerHTML = activity.type;
  priceDOM.innerHTML = getPriceString(activity.price) + " (" + activity.price.valueOf() + "€) ";
  participantsDOM.innerHTML = activity.participants.toString();
  accessibilityDOM.innerHTML = getAccessibilityString(activity.accessibility);

  //Reseteamos los datos 
  participantsForm.value = "";

}


});

function getPriceString(price: number): string {
  if (price >= 0 && price <= 0.4) {
    return "Low";
  } else if (price >= 0.5 && price <= 0.7) {
    return "Medium";
  } else if (price >= 0.8 && price <= 1) {
    return "High";
  }
  return "";
}

function getAccessibilityString(accessibility: number): string {
  if (accessibility >= 0 && accessibility <= 0.4) {
    return "Low";
  } else if (accessibility >= 0.5 && accessibility <= 0.7) {
    return "Medium";
  } else if (accessibility >= 0.8 && accessibility <= 1) {
    return "High";
  }
  return "";
}
