export const errorsMessages = {
    errorInputParameters : "Errore input Parametri",
    errorSave : 'Errore nel Salvataggio',
    errorOperationNot : 'Operazione non Permessa',
    register : {
        mailNotValid : 'Inserisci una mail valida name@server.com',
        mailExist : 'Email Esistente !',
        passwordNotValid : 'Password > 5 Caratteri',
        nameNotValid : 'Name non vuoto',
    },
    login : {
        notAuthorizedEmail : 'Non autorizzato,Email errata !',
        notAuthorizedPassword : 'Non autorizzato,Password errata !',
        unauthorized : 'Non autorizzato!',
    },
    posts : {
        titleLower : "Titolo LowerCase",
        titleLength : "Titolo Maggiore di 3 Caratteri",
        teaserLength : "Teaser Maggiore di 3 Caratteri",
        slugLength : "Slug Maggiore di 3 Caratteri",
        descriptionLength : "Description Maggiore di 3 Caratteri",
        fileError : "Estensione non consentita solo: image/png | image/jpg |  image/jpeg",
        fileAttach : "Nessun immagine allegata...",
        postNotFound : 'Post Not Found or Not Your Post',
    }
}

export const successMessages = {
    successOperation : "Success Operation"
}
