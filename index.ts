import * as $rdf from 'rdflib';

const store = $rdf.graph();

const turtleData = `
  @prefix ex: <http://example.org/> .
  ex:subject1 ex:predicate1 "Hello World" .
`;

const sparqlQuery = `
  SELECT ?s ?p ?o WHERE { ?s ?p ?o }
`;

function addTurtleToStore(turtleData: string, store: $rdf.IndexedFormula, baseIRI: string) {
  $rdf.parse(turtleData, store, baseIRI, 'text/turtle');
}

function addTripleToStore(subject: string, predicate: string, object: string, store: $rdf.IndexedFormula) {
  const subjNode = $rdf.sym(subject);
  const predNode = $rdf.sym(predicate);
  const objNode = $rdf.literal(object);
  store.add(subjNode, predNode, objNode);
}

function logAllTriples(graph: $rdf.IndexedFormula) {
  graph.statements.forEach((st) => {
    console.log(st.subject.value, st.predicate.value, st.object.value);
  });
}

function runSparqlQuery(store: $rdf.IndexedFormula, query: string) {
  const queryObj = $rdf.SPARQLToQuery(query, false, store);
  if (!queryObj) {
    console.error('Failed to parse SPARQL query');
    return;
  }
  store.query(
    queryObj as $rdf.Query,
    (result) => {
      console.log('SPARQL result:', result);
    },
    null,
    () => {
      console.log('SPARQL query completed');
    }
  );
}

// Add Turtle
const baseIRI = 'http://example.org/';
addTurtleToStore(turtleData, store, baseIRI);

// Add single triple
addTripleToStore('http://example.org/subject2', 'http://example.org/predicate2', 'Another triple', store);

// Log Store
logAllTriples(store);

// Run SPARQL query
runSparqlQuery(store, sparqlQuery);
