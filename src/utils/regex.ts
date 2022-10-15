export const urlRegex = /https?:\/\/(www.)?[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+(\/(\w|[-_%.#?=&+])+)+/g;

export const tagRegex = /^([^\x00-\x7F]|[\w_\-]){2,20}$/;

export const imageLinkRegex = /^(?:(?<scheme>[^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*\/)?(?<file>[^?#]*\.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]))(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/gm
