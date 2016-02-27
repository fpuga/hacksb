var DOMAINS_REPO = new Backbone.UILib.DomainCollection([
  {'category': 'utente', 'text': ''},
  {'category': 'utente', 'text': 'Anadarco Mozambique'},
  {'category': 'utente', 'text': 'Municipio de Pemba'},
  {'category': 'utente', 'text': 'Porto de Pemba'},
  {'category': 'provincia', 'text': ''},
  {'category': 'provincia', 'text': 'Cabo Delgado'},
  {'category': 'provincia', 'text': 'Niassa'},
  {'category': 'distrito', 'text': '', 'parent': 'Niassa'},
  {'category': 'distrito', 'text': 'Ancuabe', 'parent': 'Niassa'},
  {'category': 'distrito', 'text': 'Balama', 'parent': 'Niassa'},
  {'category': 'posto', 'text': '', 'parent': 'Ancuabe'},
  {'category': 'posto', 'text': 'Mesa', 'parent': 'Ancuabe'},
  {'category': 'posto', 'text': '', 'parent': 'Balama'},
  {'category': 'posto', 'text': 'Metoro', 'parent': 'Balama'},
  {'category': 'licencia_tipo', 'text': ''},
  {'category': 'licencia_tipo', 'text': 'Superficial'},
  {'category': 'licencia_tipo', 'text': 'Subterránea'},
  {'category': 'licencia_estado', 'text': '', 'alias': '', 'order': 0},
  {'category': 'licencia_estado', 'text': 'Irregular', 'alias': 'irregular', 'order': 1},
  {'category': 'licencia_estado', 'text': 'Licenciada', 'order': 4},
  {'category': 'licencia_estado', 'text': 'Pdte Solicitaçao utente', 'order': 2},
  {'category': 'licencia_estado', 'text': 'Pdte Emisao', 'order': 3},
  {'category': 'pagamento', 'text': ''},
  {'category': 'pagamento', 'text': 'Pagada'},
  {'category': 'pagamento', 'text': 'Non pagada'},
  {'category': 'actividade', 'text': ''},
  {'category': 'actividade', 'text': 'Abastecemento'},
  {'category': 'actividade', 'text': 'Saneamento'},
  {'category': 'actividade', 'text': 'Industria'},
  {'category': 'bacia', 'text': ''},
  {'category': 'bacia', 'text': 'Megaruma'},
  {'category': 'bacia', 'text': 'Messalo'},
  {'category': 'subacia', 'text': '', 'parent': 'Megaruma'},
  {'category': 'subacia', 'text': 'Miruco', 'parent': 'Megaruma'},
  {'category': 'subacia', 'text': '', 'parent': 'Messalo'},
  {'category': 'subacia', 'text': 'Muaguide', 'parent': 'Messalo'},
  {'category': 'actividade', 'text': 'Abastecimento'},
  {'category': 'actividade', 'text': 'Saneamento'},
  {'category': 'actividade', 'text': 'Indústria'},
  // {'category': 'tipo-fonte', 'text': 'Pozo', 'parent': 'Subterránea'},
  // {'category': 'tipo-fonte', 'text': 'Furo', 'parent': 'Subterránea'},
  // {'category': 'tipo-fonte', 'text': 'Nascente', 'parent': 'Subterránea'},
  // {'category': 'tipo-fonte', 'text': 'Outros', 'parent': 'Subterránea'},
  // {'category': 'tipo-fonte', 'text': 'Río', 'parent': 'Superficial'},
  // {'category': 'tipo-fonte', 'text': 'Albufeira', 'parent': 'Superficial'},
  // {'category': 'tipo-fonte', 'text': 'Lago', 'parent': 'Superficial'},
]);