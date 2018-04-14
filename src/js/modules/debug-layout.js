function DebugLayout( el ) {
    var DEBUG_CLASS = 'is-debugging-layout'
    el.addEventListener('click', function(e) {
        e.preventDefault()
        if (document.body.classList.contains(DEBUG_CLASS)) {
            document.body.classList.remove(DEBUG_CLASS)
        } else {
            document.body.classList.add(DEBUG_CLASS)
        }
    })
}

module.exports = DebugLayout;
