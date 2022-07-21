describe('The simple_orbit_plot page', () => {
  it('successfully loads', () => {
      cy.visit('/examples/simple_orbit_plot.html')
  })
  it('and makes the plot', () => {
      cy.get('#galpy-orbit-graph').find('.plot-container')
  })
})
