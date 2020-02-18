# WepApp
To run 
  1)go to webapp/backend:
  2)npm start
  3)in a new terminal go to webapp/frontend
  4)npm start


There will be two types of users - Vendors and Customers.
There must be a registration and login feature for both users. During registration, there
would be the option to select between customer and vendor type. (10 marks)
Use Cases of the Vendor:
○ Should be able to create a new product specifying the following: (5 marks)
■ Name of Product
■ Price of the Bundle
■ Quantity in the Bundle
○ Should be able to view all the current product listing done by him/her
■ There should be an option to take down a listing making sure that
customers get their product status as canceled. (5 marks)
Once the product is ready to dispatch (i.e. when it has been ordered by
sufficient people), it is removed from this view and becomes ready to
dispatch. (5 marks)
○ Should be able to separately view all the orders that are ready to dispatch
■ Should have a button to dispatch the product which removes it from this
view. (5 marks)
○ All dispatched orders should be displayed in another view with the reviews and
ratings of each order. (5 marks)
Use Cases of the Customer :
○ Should be able to search for the product he/she wants (Exact string matching
would do)
■ All the vendors selling that product should be displayed along with their
price and quantity remaining (5 marks)
■ Should be able to sort the search results either by price or quantity of
items in bundle left or the rating of the seller (5 marks)
○ Should be able to select a product listed in the search results and place the order
after specifying the quantity he/she desires (5 marks)
○ Should be able to separately view the status of all the products he/she has
ordered and should contain:
■ Its dispatch status (10 marks)
■ Its dispatch status (10 marks)
● Waiting (If not enough orders have been placed meeting the
minimum bulk quantity requirement by the seller)
● Placed (If the quantity requirements are met but is yet to get
dispatched by the seller in his/her portal)
● Dispatched (If the seller accepts the order in his/her portal)
● Canceled (If the seller cancels the order in his/her portal)
■ In the case of Waiting State, the following also needs to be
displayed/implemented (5 marks)
● Quantity left for the order to get placed
● Option to edit the order if not in the dispatched state
■ Should be able to rate the vendor once the order is placed. Average rating
of the vendor must be displayed in the search results. (5 marks)
■ Should be able to give a product review along with a rating once the
product has been dispatched. Clicking on a particular vendor in the
search results should display their reviews. (10 marks)
Basic Minimal UI for good user experience. (20 marks)

For example, consider a vendor who wants to sell 100 pens as a bulk product for Rs. 150.
Different customers who want a pen can select this bundle and list the quantity that only he/she
wants - one customer might want 3 pens, another wants 5 and so on. Once the requirement of
100 pens is done, the vendor is able to see this in another view and can choose whether or not
to dispatch it. Once he dispatches it, this is rem
