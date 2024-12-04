export const base64Image = (file, callback) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(file.type);
      callback(dataURL);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;

 
      const base64String = result.split(",")[1]; 
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export function base64ToFile(base64File, name, type = "image/png") {
  const i = base64File.indexOf("base64,") + 7;
  const base64Data = base64File.slice(i);
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let j = 0; j < byteCharacters.length; j++) {
    byteNumbers[j] = byteCharacters.charCodeAt(j);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new File([byteArray], name, { type });
}
export const dataURLtoFile = (dataurl, filename) => {
  if (!dataurl || typeof dataurl !== "string") {
    console.error("Invalid data URL passed to dataURLtoFile:", dataurl);
    return null;
  }

  const arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    console.error("Invalid data URL format:", dataurl);
    return null;
  }

  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const getSessionData = (storageKey) => {
  const savedData = sessionStorage.getItem(storageKey);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    if (parsedData.avatar && typeof parsedData.avatar === "string") {
      parsedData.avatar = base64ToFile(parsedData.avatar, "avatar-upload.jpg");
    }
    return parsedData;
  }
  return null;
};

export const persistFormDataToSession = (
  values,
  storageKey,
  fileFieldKey = ""
) => {
  const sessionData = JSON.parse(sessionStorage.getItem(storageKey)) || {};

  if (values[fileFieldKey] instanceof File) {
    base64Image(values[fileFieldKey], (base64) => {
      const updatedData = { ...sessionData, ...values, [fileFieldKey]: base64 };
      sessionStorage.setItem(storageKey, JSON.stringify(updatedData));
    });
  } else {
    const updatedData = { ...sessionData, ...values };
    sessionStorage.setItem(storageKey, JSON.stringify(updatedData));
  }
};

export const convertCategoryOptions = (data) => {
  if (!data) return;

  return data.map((el) => ({
    value: el.id,
    label: el.name,
  }));
};

export const convertSelectOptions = (data) => {
  if (!data) return;

  return data.map((el) => ({
    value: el.id,
    label: el.name,
  }));
};
