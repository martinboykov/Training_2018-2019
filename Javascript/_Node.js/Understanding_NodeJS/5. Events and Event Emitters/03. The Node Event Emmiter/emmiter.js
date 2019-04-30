function Emiter(){
    this.events = {};
}
Emiter.prototype.on = function(type, listener){
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
};

Emiter.prototype.emit = function(type){
    if (this.events[type]) {
        this.events[type].forEach((listener) => {
            listener();
        });

    }
}

module.exports = Emiter;
