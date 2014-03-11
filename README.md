It is a simple paginate plugin


you can make your table to many page.
Just use $("#yourTableID").paginate({
				rowsPage:number
			            ]});
rowsPage means that how many record in a page.

Notice that I count the table length to determine how many record to hide, so you need to
set your table <th></th> first , and <th></th> never hide.
