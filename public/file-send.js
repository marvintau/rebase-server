class FileSend {

    constructor(){
        this.destName   = undefined;
        this.file       = undefined;
        this.fileReader = new FileReader();
        this.blockSize  = 524288; 
        this.startFunc = undefined;
    }

    /**
     * starting the file upload by returning a promise.
     * @param {string} id associate file with the file input.
     */
    start(id, destName){
        this.file = document.getElementById(id).files[0];
        this.destName = destName;

        console.log("started");

        if (this.file && this.startFunc)
            this.startFunc(this);
        else
            throw new TypeError('FileStub.start: either file not prepared, or startFunc not defined');
    }

    /**
     * read the file as text string.
     */
    readAsText(){
        return this.fileReader.readAsText();
    }

    readSlice(initPosition){

        if(this.blockSize === undefined)
            throw new TypeError('readblock: Blocksize not specified');
        
        var position = initPosition * this.blockSize,
            sliceEnd = position + Math.min(this.blockSize, this.file.size - position),
            fileSlice = null;

        for (let method of ["slice", "webkitSlice", "mozSlice"]) if (this.file[method]){
            fileSlice = this.file[method](position, sliceEnd);
            break;
        }

        if (fileSlice)
            this.fileReader.readAsBinaryString(fileSlice); // trigger upload event
    }

    dispose(){
        this.file = this.fileReader = undefined;
    }

    setStartFunc(startFunc){
        this.startFunc = startFunc;
    }

    setOnload(onload){
        this.fileReader.onload = function(event){
            onload(event, this);
        }.bind(this);
    }
};
