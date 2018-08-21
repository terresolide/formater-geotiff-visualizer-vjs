var drawLocal = {
  // format: {
  //  numeric: {
  //    delimiters: {
  //      thousands: ',',
  //      decimal: '.'
  //    }
  //  }
  // },
  draw: {
    toolbar: {
      // #TODO: this should be reorganized where actions are nested in actions
      // ex: actions.undo  or actions.cancel
      actions: {
        title: 'Stopper sans enregistrer',
        text: 'Annuler'
      },
      finish: {
        title: 'Terminer et sauvegarder',
        text: 'Enregistrer'
      },
      undo: {
        title: 'Effacer le dernier point',
        text: 'Effacer le dernier point'
      },
      buttons: {
        polyline: 'Dessiner une ligne brisée en cliquant sur l\'image',
        polygon: 'Draw a polygon',
        rectangle: 'Draw a rectangle',
        circle: 'Draw a circle',
        marker: 'Draw a marker',
        circlemarker: 'Draw a circlemarker'
      }
    },
    handlers: {
      circle: {
        tooltip: {
          start: 'Click and drag to draw circle.'
        },
        radius: 'Radius'
      },
      circlemarker: {
        tooltip: {
          start: 'Click map to place circle marker.'
        }
      },
      marker: {
        tooltip: {
          start: 'Click map to place marker.'
        }
      },
      polygon: {
        tooltip: {
          start: 'Click to start drawing shape.',
          cont: 'Click to continue drawing shape.',
          end: 'Click first point to close this shape.'
        }
      },
      polyline: {
        error: '<strong>Erreur:</strong> les côtés ne peuvent pas se croiser!',
        tooltip: {
          start: 'Cliquer pour commencer la ligne.',
          cont: 'Cliquer pour continuer.',
          end: 'Cliquer pour terminer'
        }
      },
      rectangle: {
        tooltip: {
          start: 'Click and drag to draw rectangle.'
        }
      },
      simpleshape: {
        tooltip: {
          end: 'Release mouse to finish drawing.'
        }
      }
    }
  },
  edit: {
    toolbar: {
      actions: {
        save: {
          title: 'Sauvegarder les modifications',
          text: 'Sauvegarder'
        },
        cancel: {
          title: 'Stopper l\'édition sans enregistrer',
          text: 'Annuler'
        },
        clearAll: {
          title: 'Effacer tous les éléments',
          text: 'Initialiser'
        }
      },
      buttons: {
        edit: 'Editer les éléments',
        editDisabled: 'Aucun élément à éditer',
        remove: 'Effacer des éléments en cliquant dessus',
        removeDisabled: 'Aucun élément à effacer'
      }
    },
    handlers: {
      edit: {
        tooltip: {
          text: 'Déplacer l\'élément pour modifier.',
          subtext: 'Cliquer sur annuler pour ne pas sauvegarder les modifications.'
        }
      },
      remove: {
        tooltip: {
          text: 'Cliquer sur les éléments pour les supprimer.'
        }
      }
    }
  }
}
module.exports = drawLocal
