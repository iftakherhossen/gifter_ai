import FileSaver from 'file-saver';
import toast from 'react-hot-toast';

import { surpriseMePrompts } from '../constants';

export function getRandomPrompt(prompt) {
     const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
     const randomPrompt = surpriseMePrompts[randomIndex];

     if (randomPrompt === prompt) return getRandomPrompt(prompt);

     return randomPrompt;
};

export async function downloadImage(_id, photo) {     
     try {
          toast.loading('Image downloading...');
          FileSaver.saveAs(photo, `gifter-${_id}.jpg`);
     }
     catch(err) {
          console.log(err);
     }
     finally {
          toast.dismiss(loading);
     }
};

const colors = ["#ff80ed", "#065535", "#133337", "#ffc0cb", "#008080", "#ff000d", "#ffd700", "#ffa500", "#ff7373", "#40e0d0", "#b0e0e6", "#666666", "#bada55", "#003366", "#fa8072", "#800000", "#c39797", "#f08080", "#20b2aa", "#66cdaa", "#ff6666", "#ff7f50", "#468499", "#f6546a", "#008000", "#0e2f44", "#6897bb", "#088da5", "#8b0000", "#0a75ad", "#420420", "#a0db8e", "#3399ff", "#794044"];

export function getRandomColor() {
     const randomIndex = Math.floor(Math.random() * colors.length);
     const randomColor = colors[randomIndex];

     if (randomColor === colors) return getRandomPrompt(colors);

     return randomColor;
}