///<reference types='Cypress'/>
///<reference types='Cypress-iframe'/>

import 'cypress-iframe' // for controling frames
import '@4tw/cypress-drag-drop' // for drag ND drops

describe('Mailmunch task',()=>
{
    it.only('should drag Nd drop', () => {

         cy.visit('https://react-email-editor-demo.netlify.app/')

         /* step 1 . Drag Nd Drop */
        cy
          .get('iframe')
          .should(iframe => expect(iframe.contents().find('body')))
          .then(iframe => cy.wrap(iframe.contents().find('body')))
          .within({}, $iframe => {
            cy.get('div.tab-pane.active div > div:nth-child(8)',{timeout:12000}).drag('#u_column_1 > div > div > div:nth-child(3)', { force: true })

             /*  to validate if drag and drop is successfull the new P must contain text "This is a new Text block. Change the text." */
            cy.xpath("//p[contains(text(),'This is a new')]").should(($el)=>
           {
               expect($el).contains.text('This is a new Text block. Change the text.') // this assertion verifies drag and drop 
          })

          })

         
         /* step 2. this part validates allignment */
          cy
          .get('iframe')
          .should(iframe => expect(iframe.contents().find('body')))
          .then(iframe => cy.wrap(iframe.contents().find('body')))
          .within({}, $iframe => {
            
          cy.xpath("//p[contains(text(),'This is a new')]").dblclick({force: true}) // double click on text to perform operation
          cy.get("a[role='button']:nth-child(3)").click() // click on right alignment button
          cy.get('div.editable.mce-content-body').should(($el)=>
           {
            expect($el).to.have.css('text-align', 'right') // this assertion validates right allignment
           })

          })
    })
}) 