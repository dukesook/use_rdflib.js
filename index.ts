import * as $rdf from 'rdflib';

// Create a store
const store = $rdf.graph();

// Example Turtle data
const turtleData = `
  @prefix ex: <http://example.org/> .
  ex:subject1 ex:predicate1 "Hello World" .
`;

// Base IRI (needed for parsing)
const baseIRI = 'http://example.org/';

// Parse the Turtle into the store
$rdf.parse(turtleData, store, baseIRI, 'text/turtle');

// Log all triples
store.statements.forEach((st) => {
  console.log(st.subject.value, st.predicate.value, st.object.value);
});
