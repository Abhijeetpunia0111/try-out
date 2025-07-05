import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDTqY7QAPYFxwNfrPMZ72h4ITNB5THpJQ",
  authDomain: "quickplay-5fec4.firebaseapp.com",
  projectId: "quickplay-5fec4",
  storageBucket: "quickplay-5fec4.appspot.com",
  messagingSenderId: "468647212457",
  appId: "1:468647212457:web:748aa93f88491d95fe80b8",
  measurementId: "G-NDR010K68R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const movies = [
  {
    id: "Movie_01",
    Title: "Loki: The Time Traveler",
    Description: "A thrilling sci-fi adventure through space and time.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/marvels-loki-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/marvels-loki-2x3.jpg"
    },
    Rating: "PG",
    genres: ["SciFi", "Adventure", "Action"]
  },
  {
    id: "Movie_02",
    Title: "28 Year Later",
    Description: "A thrilling sci-fi adventure through space and time.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/28-year-later-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/28-year-later-2x3.jpg"
    },
    Rating: "PG",
    genres: ["SciFi", "Adventure", "Action"]
  },
  {
    id: "Movie_03",
    Title: "Mystic Quest",
    Description: "An epic fantasy journey.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Mystic%20Quest%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Mystic%20Quest%20-2x3.jpg"
    },
    Rating: "PG-13",
    genres: ["Fantasy", "Adventure"]
  },
  {
    id: "Movie_04",
    Title: "The Accountant 2",
    Description: "Action loving detective story of a boy.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/The%20Accountant%202%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/The%20Accountant%202%20-2X3.jpg"
    },
    Rating: "PG-13",
    genres: ["Fantasy", "Adventure"]
  },
  
{
  id: "Movie_05",
  Title: "Dune: Part Two",
  Description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against his family’s killers.",
  Images: {
    "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Dune%20Part%20Two%20-16x9.jpg",
    "1:1": "",
    "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Dune%20Part%20Two%20-2x3.jpg"
  },
  Rating: "PG-13",
  genres: ["Sci-Fi", "Adventure", "Drama"]
},

{
  id: "Movie_06",
  Title: "Spider-Man: No Way Home",
  Description: "Peter Parker faces the Multiverse when Doctor Strange's spell goes wrong.",
  Images: {
    "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Spider-Man%20No%20Way%20Home%20-16x9.jpg",
    "1:1": "",
    "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Spider-Man%20No%20Way%20Home%20-2x3.jpg"
  },
  Rating: "PG-13",
  genres: ["Action", "Sci-Fi", "Adventure"]
},

{
  id: "Movie_07",
  Title: "The Batman",
  Description: "Batman uncovers corruption in Gotham and fits clues along the way to finding the Riddler.",
  Images: {
    "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/The%20Batman%20-16x9.jpg",
    "1:1": "",
    "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/The%20Batman%20-2x3.jpg"
  },
  Rating: "PG-13",
  genres: ["Action", "Crime", "Drama"]
},

{
  id: "Movie_08",
  Title: "Oppenheimer",
  Description: "The story of J. Robert Oppenheimer and the invention of the atomic bomb.",
  Images: {
    "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Oppenheimer%20-16x9.jpg",
    "1:1": "",
    "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Oppenheimer%20-2x3.jpg"
  },
  Rating: "R",
  genres: ["Biography", "Drama", "History"]
},

{
  id: "Movie_09",
  Title: "Everything Everywhere All at Once",
  Description: "An unlikely hero must channel her newfound powers to fight bizarre dangers from the multiverse.",
  Images: {
    "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Everything%20Everywhere%20All%20at%20Once%20-16x9.jpg",
    "1:1": "",
    "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Everything%20Everywhere%20All%20at%20Once%20-2x3.jpg"
  },
  Rating: "R",
  genres: ["Action", "Sci-Fi", "Comedy"]
},

{
  id: "Movie_10",
  Title: "Top Gun: Maverick",
  Description: "After more than 30 years, Maverick is where he belongs, pushing the envelope as a top naval aviator.",
  Images: {
    "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Top%20Gun%20Maverick%20-16x9.jpg",
    "1:1": "",
    "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Top%20Gun%20Maverick%20-2x3.jpg"
  },
  Rating: "PG-13",
  genres: ["Action", "Drama", "Romance"]
},

{
  id: "Movie_11",
  Title: "Black Panther: Wakanda Forever",
  Description: "Queen Ramonda, Shuri, and Nakia fight to protect their nation from intervening world powers.",
  Images: {
    "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Black%20Panther%20Wakanda%20Forever%20-16x9.jpg",
    "1:1": "",
    "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Black%20Panther%20Wakanda%20Forever%20-2x3.jpg"
  },
  Rating: "PG-13",
  genres: ["Action", "Drama", "Fantasy"]
},
{
    id: "Movie_12",
    Title: "Gladiator 2",
    Description: "Lucius, the son of Lucilla and nephew of Emperor Commodus, comes of age as he seeks the truth of his heritage and follows in the footsteps of the fallen gladiator, Maximus.",
    Images: {
      "16:9": "http://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Gladiator%202%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Gladiator%202%20-2x3.jpg"
    },
    Rating: "R",
    genres: ["Action", "Adventure", "Drama"]
  },
  {
    id: "Movie_13",
    Title: "Joker: Folie à Deux",
    Description: "Arthur Fleck finds a companion in Harleen Quinzel, a fellow patient at Arkham Asylum, as they embark on a twisted and musical journey.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Joker%20Folie%20%C3%A0%20Deux%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Joker%20Folie%20%C3%A0%20Deux%20-2x3.jpg"
    },
    Rating: "R",
    genres: ["Crime", "Drama", "Musical"]
  },
  {
    id: "Movie_14",
    Title: "Inside Out 2",
    Description: "Joy, Sadness, Anger, Fear and Disgust have been running a successful operation, but things change when a new emotion, Anxiety, shows up.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Inside%20Out%202%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Inside%20Out%202%20-2x3.jpg"
    },
    Rating: "PG",
    genres: ["Animation", "Family", "Adventure"]
  },
  {
    id: "Movie_15",
    Title: "Deadpool & Wolverine",
    Description: "Wolverine is recovering from his injuries when he crosses paths with the loudmouth, Deadpool. They team up to defeat a common enemy.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Deadpool%20%26%20Wolverine%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Deadpool%20%26%20Wolverine%20-2x3.jpg"
    },
    Rating: "R",
    genres: ["Action", "Comedy", "Sci-Fi"]
  },
  {
    id: "Movie_16",
    Title: "Wicked",
    Description: "The story of how a green-skinned woman framed by the Wizard of Oz becomes the Wicked Witch of the West.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Wicked%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Wicked%20-2x3.jpg"
    },
    Rating: "PG",
    genres: ["Fantasy", "Musical", "Romance"]
  },
  {
    id: "Movie_17",
    Title: "Moana 2",
    Description: "Moana receives an unexpected call from her wayfinding ancestors and must journey to the far seas of Oceania for an adventure unlike anything she's ever faced.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Moana%202%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Moana%202%20-2x3.jpg"
    },
    Rating: "PG",
    genres: ["Animation", "Adventure", "Family"]
  },
  {
    id: "Movie_18",
    Title: "The Lord of the Rings: The War of the Rohirrim",
    Description: "The untold story behind Helm's Deep, delving into the life and blood-soaked times of one of Middle-earth's most legendary figures; the mighty King of Rohan - Helm Hammerhand.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/The%20Lord%20of%20the%20Rings%20The%20War%20of%20the%20Rohirrim%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/The%20Lord%20of%20the%20Rings%20The%20War%20of%20the%20Rohirrim%20-2x3.jpg"
    },
    Rating: "PG-13",
    genres: ["Animation", "Action", "Adventure"]
  },
  {
    id: "Movie_19",
    Title: "Pushpa 2: The Rule",
    Description: "Pushpa's rise in the world of red sandalwood smuggling is challenged by new adversaries and old foes, forcing him to assert his dominance.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Pushpa%202%20The%20Rule%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Pushpa%202%20The%20Rule%20-2x3.jpg"
    },
    Rating: "Not Rated",
    genres: ["Action", "Crime", "Drama"]
  },
  {
    id: "Movie_20",
    Title: "Superman",
    Description: "The story of Superman's journey to reconcile his Kryptonian heritage with his human upbringing as Clark Kent of Smallville, Kansas.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Superman%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Superman%20-2x3.jpg"
    },
    Rating: "PG-13",
    genres: ["Sci-Fi", "Action", "Adventure"]
  },
  {
    id: "Movie_21",
    Title: "Captain America: Brave New World",
    Description: "Sam Wilson's first outing as the new Captain America finds him confronting a global threat orchestrated by a group known as the Serpent Society.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Captain%20America%20Brave%20New%20World%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Captain%20America%20Brave%20New%20World%20-2x3.jpg"
    },
    Rating: "PG-13",
    genres: ["Action", "Sci-Fi", "Adventure"]
  },
  {
    id: "Movie_22",
    Title: "Mickey 17",
    Description: "An 'expendable' employee on a human expedition sent to colonize an ice world refuses to let his replacement clone take his place.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Mickey%2017%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Mickey%2017%20-2x3.jpg"
    },
    Rating: "R",
    genres: ["Sci-Fi", "Drama"]
  },
  {
    id: "Movie_23",
    Title: "Beetlejuice Beetlejuice",
    Description: "When the Deetz family returns home to Winter River, Lydia's rebellious daughter, Astrid, discovers the mysterious model of the town in the attic and the portal to the Afterlife is accidentally opened.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Beetlejuice%20Beetlejuice%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://image.tmdb.org/t/p/original/hlsIEd3mHFwrxZP2UxhNNLtg0yl.jpg"
    },
    Rating: "PG-13",
    genres: ["Comedy", "Fantasy"]
  },
  {
    id: "Movie_24",
    Title: "Alien: Romulus",
    Description: "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Alien%20Romulus%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Alien%20Romulus%20-2x3.jpg"
    },
    Rating: "R",
    genres: ["Sci-Fi", "Horror", "Action"]
  },
  {
    id: "Movie_25",
    Title: "Kantara: Chapter 1",
    Description: "A prequel that delves into the legend of the deity Panjurli and the origins of the sacred traditions in the village of Kadabettu.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Kantara%20Chapter%201%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Kantara%20Chapter%201%20-2x3.jpg"
    },
    Rating: "Not Rated",
    genres: ["Action", "Adventure", "Drama"]
  },
  {
    id: "Movie_26",
    Title: "Singham Again",
    Description: "DCP Bajirao Singham takes on the menacing drug lord Danger Lanka, who has kidnapped his wife, leading to an explosive confrontation.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Singham%20Again%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Singham%20Again%20-2x3.jpg"
    },
    Rating: "Not Rated",
    genres: ["Action", "Crime"]
  },
  {
    id: "Movie_27",
    Title: "Emilia Pérez",
    Description: "A lawyer is tasked with helping a feared cartel leader disappear forever by becoming the woman he has always dreamed of being.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Emilia%20P%C3%A9rez%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Emilia%20P%C3%A9rez%20-2x3.jpg"
    },
    Rating: "R",
    genres: ["Musical", "Comedy", "Crime"]
  },
  {
    id: "Movie_28",
    Title: "The Substance",
    Description: "A new product called 'The Substance' allows you to generate another, younger, more beautiful, more perfect version of yourself. The only rule is that you must share time between the two.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/The%20Substance%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/The%20Substance%20-2x3.jpg"
    },
    Rating: "R",
    genres: ["Horror", "Drama", "Comedy"]
  },
  {
    id: "Movie_29",
    Title: "All We Imagine as Light",
    Description: "Two nurses in Mumbai who are roommates find their lives taking unexpected turns, leading them on a trip to a beach town where their desires find a space to flow.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/All%20We%20Imagine%20as%20Light%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/All%20We%20Imagine%20as%20Light%20-2x3.jpg"
    },
    Rating: "Not Rated",
    genres: ["Drama"]
  },
  {
    id: "Movie_30",
    Title: "Mufasa: The Lion King",
    Description: "Rafiki, Timon and Pumbaa tell the story of Mufasa to a young lion cub, revealing the rise of one of the greatest kings of the Pride Lands.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Mufasa%20The%20Lion%20King%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/Mufasa%20The%20Lion%20King%20-2x3.jpg"
    },
    Rating: "PG",
    genres: ["Animation", "Family", "Adventure"]
  },
  {
    id: "Movie_31",
    Title: "The Batman Part II",
    Description: "The next chapter in the dark, gritty saga of Bruce Wayne's early years as the caped crusader in Gotham City.",
    Images: {
      "16:9": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/The%20Batman%20Part%20II%20-16x9.jpg",
      "1:1": "",
      "2:3": "https://raw.githubusercontent.com/Abhijeetpunia0111/try-out/main/posters/The%20Batman%20Part%20II%20-2x3.jpg"
    },
    Rating: "Not Rated",
    genres: ["Crime", "Action", "Drama"]
  }
  

];

movies.forEach(async movie => {
  await setDoc(doc(db, "movies", movie.id), movie);
  console.log(`Added ${movie.Title}`);
});
