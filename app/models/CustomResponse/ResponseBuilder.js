function ResponseBuilder(){

}

ResponseBuilder.prototype.setStatus = function(status){
    if(status){
        this.status = status;
    }
}

ResponseBuilder.prototype.setStatusCode = function(statusCode){
    if(statusCode){
        this.statusCode = statusCode;
    }
}

ResponseBuilder.prototype.setMessage = function(msg){
    if(msg){
        this.message = msg;
    }
}

ResponseBuilder.prototype.setData = function(reqData){
    if(reqData){
        this.data = reqData;
    }
}

module.exports= ResponseBuilder;
