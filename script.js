/*
	Description of the widget:
		- The widget is a list of items that are fetched from the API
		- Each item has an image, title, branding and a button to remove the item
		- The items are clickable and will redirect to the item's url
		- The widget is responsive and will change the number of items per row based on the screen size
*/

// Fetching the data from the API
const fetchData = url => {
	return fetch(url,{mode: 'cors'})
		.then(response => response.json())
		.catch(error => console.error(error));
}

// Rendering the widget
const renderWidget = (data) => {
    if(!data){
        console.log("Error with fetching the data");
        return;
    }

	let items = data.list;
	let widget = document.querySelector(".widget-body");
	items.forEach(item => {
		let widgetItem = document.createElement("div");
		widgetItem.classList.add("widget-item");

		//only add the categories if they exist
		if (item.categories !== undefined) {
			let categories = document.createElement("p");
			categoriesHolder = '';
			item.categories.forEach(category => { categoriesHolder += category + ', ' });
			console.log(categoriesHolder);
			categoriesHolder = categoriesHolder.slice(0, -2); 
			console.log(categoriesHolder);
			categories.innerText = categoriesHolder;
			widgetItem.appendChild(categories);
		}

		let img = document.createElement("img");
		img.src = item.thumbnail[0].url;
		widgetItem.appendChild(img);

		let title = document.createElement("h4");
		title.innerText = item.name;
		widgetItem.appendChild(title);

		let titleDiv = document.createElement("div");
		titleDiv.classList.add("title");
		titleDiv.appendChild(title);

		let branding = document.createElement("p");
		branding.innerText = item.branding;
		widgetItem.appendChild(branding);

		let brandingDiv = document.createElement("div");
		brandingDiv.classList.add("branding");
		brandingDiv.appendChild(branding);


		let button = document.createElement("button");
		button.addEventListener("click", ()=>{
			widgetItem.remove();
		});
		button.title = "Remove this item";
		button.classList.add("buttonoverlap");
		button.innerText = "x";


		let link = document.createElement("a");
		link.href = item.url;
		link.appendChild(img);
		link.appendChild(titleDiv);
		link.appendChild(brandingDiv);

		
		widgetItem.appendChild(button);
		widgetItem.appendChild(link);

		widget.appendChild(widgetItem);
	});
}

// Calling the functions

const url = "https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init"
fetchData(url).then(data => renderWidget(data));
