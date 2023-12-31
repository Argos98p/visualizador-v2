const BaseURL="https://3dmotores.com";


/*
function statusEsceneUrl(id,escenaNombre){
    return `${BaseURL}:8084/api/objects/getstatusescene?idobjeto=${id}&nombre_escena=${escenaNombre}`
}*/

function infoObjectUrl(id:string){
    return `${BaseURL}/objects/getobject?idobjeto=${id}`;
}

function logoEmpresaImage(idUser:string){
    return `${BaseURL}/ObjetosVirtuales/usuarios/${idUser}/${idUser}.jpg`
}

/*
function numberFramesInScene(id,escena){
    return `${BaseURL}:8084/api/objects/getnumberframes?idobjeto=${id}&nombre_escena=${escena}`
}*/

function completeImageUrl(path:string){
    return `${BaseURL}/ObjetosVirtuales${path}`;
}
function blurImages(){
    return `${BaseURL}/objects/censorimages`;
}

function getExtrasUrl(id:string){
    return `${BaseURL}/objects/getextras?idobjeto=${id}`
}

function ImagePath(pathImage:string){
    
    return `${BaseURL}/ObjetosVirtuales/${pathImage}`;
}


function  postAddHotspot(id:string,nombreEscena:string,idUsuario:string){
    return `${BaseURL}/objects/addhotspot?idobjeto=${id}&nombre_escena=${nombreEscena}&idusuario=${idUsuario}`;
}

function deleteExtra(idObjeto:string,idExtra:string,idUsuario:string){
    return `${BaseURL}/objects/deleteextra?idobjeto=${idObjeto}&idextra=${idExtra}&idusuario=${idUsuario}`;
}

function uploadExtraUrl(id:string,archivo:string,descripcion:string,idUsuario:string){
    return `${BaseURL}/objects/addextra/imagen?idobjeto=${id}&archivo=${archivo}&descripcion=${descripcion}&tipo=extra&idusuario=${idUsuario}`;
}

function img360CompleteUrl(path:string/*,id:string*/){
    return `${BaseURL}/ObjetosVirtuales${path}?${new Date().getTime().toString}`;
}
function getHotspots(id:string, nombreEscena:string){
    return `${BaseURL}/objects/gethotspots?idobjeto=${id}&nombre_escena=${nombreEscena}`
}

function deleteHotspot(id:string, nombreEscena:string,nombreHotspot:string,idUsuario:string){
    return `${BaseURL}/objects/deletehotspot?idobjeto=${id}&nombre_escena=${nombreEscena}&nombreHotspot=${nombreHotspot}&idusuario=${idUsuario}`
}
function addExtraPdf(id:string,nombre_doc:string,titulo:string, descripcion:string,idUsuario:string){
    return `${BaseURL}/objects/addextra/pdf?idobjeto=${id}&archivo=${nombre_doc}&titulo=${titulo}&descripcion=${descripcion}&tipo=hotspot&idusuario=${idUsuario}`;
}

function addLinkYoutube(id:string,nombreArchivo:string, link:string, titulo:string,descripcion:string,idUsuario:string){
    return `${BaseURL}/objects/addextra/link?idobjeto=${id}&nombre=${nombreArchivo}&tipo=hotspot&link=${link}&titulo=${titulo}&descripcion=${descripcion}&idusuario=${idUsuario}`;
}
function getPDF(id:string,path:string){
    return `${BaseURL}/images/getresource?path=${path}`
}

function viewResource(id:string,path:string){
    
    return `${BaseURL}/ObjetosVirtuales/${path}`;
    //return `${BaseURL}/images/viewresource/pdf?path=${path}`
}

function verificaToken(idUser:string){
    return `${BaseURL}/objects/verificacion?idusuario=${idUser}`;
}

function loginUser(){
    return `${BaseURL}:8086/api/auth/signin`
}
export {blurImages,logoEmpresaImage,verificaToken,viewResource,loginUser,addLinkYoutube,img360CompleteUrl,getPDF,addExtraPdf,deleteHotspot,uploadExtraUrl,infoObjectUrl,getHotspots,completeImageUrl,getExtrasUrl,ImagePath,postAddHotspot,deleteExtra}