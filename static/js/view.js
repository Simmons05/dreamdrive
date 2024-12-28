window.onload=function(){
	const rootDir="../";//"C:\\Users\\NJEHIA\\Desktop\\HMS\\";
/*
const images=[
		{
			src:"C:/Users/NJEHIA/Desktop/HMS/"+"download-2.jpg",
			desc:"Image 1",
			price:"30500$",
			category:"Sale"
		},
		{
			src:rootDir+"pexels-mikebirdy-170811.jpg",
			desc:"Image 2",
			price:"30$/day",
			category:"Rental"
		}
	]
	const canvas=document.querySelector(".canv");
	images.forEach(image=>{
		const frame=document.createElement("div");
		frame.classList.add("frame");

		const img=document.createElement("img");
		img.src=image.src

		img.setAttribute("data-description",image.desc);
		img.setAttribute("data-price",image.price);
		img.setAttribute("data-category",image.category);

		const descDiv=document.createElement("div");
		descDiv.classList.add("description");

		const heading=document.createElement("h3");

		heading.textContent=image.desc;

		const pricePar=document.createElement("p");
		pricePar.classList.add('price');
		pricePar.textContent=image.price;

		const catgPar=document.createElement("p");
		catgPar.textContent=image.category;

		descDiv.appendChild(heading);
		descDiv.appendChild(pricePar);
		descDiv.appendChild(catgPar);

		frame.appendChild(img);
		frame.appendChild(descDiv);

		canvas.appendChild(frame);
	});*/

	const forms=document.forms;
	document.querySelectorAll(".car-card img").forEach(binary=>{
		binary.addEventListener("mouseover",function(){
			const tool=document.createElement('div');
			tool.className="tool-tip";//setAttribute("class","tool-tip");

			const content=document.createElement("span");
			content.textContent="click to order";

			tool.classList.toggle("show");
			tool.appendChild(content);
			binary.appendChild(tool);

		});
	});
	



}