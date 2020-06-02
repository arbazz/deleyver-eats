import firebase from '../index';
import { uuid } from 'uuidv4';

export default async function saveImage(image) {
  console.log(image)
    const ref = firebase
        .storage()
        .ref()
        .child(`${uuid()}`);
    const snapshot = await ref.put(image);


    return await snapshot.ref.getDownloadURL();
}