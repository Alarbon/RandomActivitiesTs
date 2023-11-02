import { Activity } from "../Interfaces/Activity.interface";

export async function requestActivity(
  numParticipants: number,
  typePrice: string,
  typeAccessibility: string
): Promise<Activity> {
  let url: string =
    "https://www.boredapi.com/api/activity?participants=" +
    numParticipants +
    "&" +
    getPrice(typePrice) +
    "&" +
    getAccessibility(typeAccessibility);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return await response.json();
}

export async function requestActivityRandom(): Promise<Activity> {
  let url: string = "https://www.boredapi.com/api/activity";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return await response.json();
}

function getAccessibility(typeAccessibility: string) {
  switch (typeAccessibility) {
    case "low":
      return "minaccessibility=0&maxaccessibility=0.4";
    case "medium":
      return "minaccessibility=0.5&maxaccessibility=0.7";
    case "high":
      return "minaccessibility=0.8&maxaccessibility=1";
    default:
      return "";
  }
}
function getPrice(typePrice: string) {
  switch (typePrice) {
    case "low":
      return "minprice=0&maxprice=0.4";
    case "medium":
      return "minprice=0.5&maxprice=0.7";
    case "high":
      return "minprice=0.8&maxprice=1";
    default:
      return "";
  }
}
