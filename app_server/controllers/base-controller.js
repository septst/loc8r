const showError = (req, res, status) => {
    let title = "";
    let content = "";
    if (status === 404) {                                                   
        title = '404, page not found';                                        
        content = 'Oh dear. Looks like you can\'t find this page. Sorry.';    
    } else {                                                                
        title = `${status}, something's gone wrong`;                          
        content = 'Something, somewhere, has gone just a little bit wrong.';  
    }
    res.status(status);
    res.render('generic-text',{
        title,
        content
    });
};

module.exports = {
    showError
};