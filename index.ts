import * as $rdf from 'rdflib';

const store = $rdf.graph();

const turtleData = `
  @prefix ex: <http://example.org/> .
  ex:subject1 ex:predicate1 "Hello World" .
`;

const baseIRI = 'http://example.org/';

$rdf.parse(turtleData, store, baseIRI, 'text/turtle');

function logAllTriples(graph: $rdf.IndexedFormula) {
  graph.statements.forEach((st) => {
    console.log(st.subject.value, st.predicate.value, st.object.value);
  });
}

logAllTriples(store);

console.log('end of file');
