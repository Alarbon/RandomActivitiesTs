import { ActivityPhoto } from "../Interfaces/ActivityPhoto.interface";

export async function requestPhoto(activityType: string) : Promise<ActivityPhoto> {
  let url: string =
    "https://api.unsplash.com/search/photos?page=12&query=" +
    activityType +
    "&client_id=i85g48nn647qwHvEJqaX4taEZOMkMI-vrAatsNG4GP0";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return await response.json();
}
