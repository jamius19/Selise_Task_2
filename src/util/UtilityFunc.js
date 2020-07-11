function getCookie(name) {
   let value = "; " + document.cookie;
   let parts = value.split("; " + name + "=");
   if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value) {
   document.cookie = name + '=' + value + '; Path=/;';
}

function deleteCookie(name) {
   document.cookie = name + '=; Path=/; Expires=Fri, 19 Dec 2022 00:00:01 GMT;';
}


export {getCookie, deleteCookie, setCookie};