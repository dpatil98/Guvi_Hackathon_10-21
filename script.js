 document.body.innerHTML= `

 <div class="text-center mt-4 head-line" ><h1>Nationalize API</h1></div>

<section class="container p-4"> <!-- container starts---------------------------------------------- -->
<div class="row">    <!--  ------------------------------------------------------------- Row For Search Bar -->

       <div class="col-12">
           <div class="d-flex justify-content-center" >
               <input type="search" class="srch-value" placeholder="Search a Name" required  >                              <!-- srch-value to get value in getData()-->
               <button class="btn-srch" onClick="getData()"><i class="bi bi-binoculars-fill"></i>  Search</button>
           </div>
       </div>

   </div>   <!-------------------------------------------------------------- Row For Search Bar Ends Here -->

   <div class="row "> <!-- ----------------------------------------------------- Row For Advance Search Bar -->

       <div class="col-12 m-2">
            <div class="d-flex justify-content-center mx-2" >
               <div class="mt-3"> 
                   <a data-toggle="collapse" href="#collapseExample" role="button"  class="adv-Search"> Advance Search With Filters <i class="bi bi-caret-down-fill"></i> </a>
                   <div class="collapse" id="collapseExample">
                       <div class="card adv-card card-body">
                           <div class="row ">

                               <div class="col-md-4 col-sm-12">
                                   <div class="drop-Menu">
                                       <select name="Titles" id="ttl">
                                           <option value="Title">Title</option>
                                           <option value="title">Title</option>
                                           <option value="title">Title</option>
                                           <option value="title">Title</option>
                                       </select>
                                   </div>
                               </div>                               
                            
                               <div class="col-md-4 col-sm-12">
                                   <div class="drop-Menu ">
                                   <select name="Types" id="type">
                                       <option value="Type">Type</option>
                                       <option value="type">Type</option>
                                       <option value="type">Type</option>
                                       <option value="type">Type</option>
                                     </select>
                                   </div>  
                               </div>

                               <div class="col-md-4 col-sm-12">
                                    <input type="number" class="" min="1900" max="2099" step="1" value="2016" > 
                               </div>

                           </div>
                       </div>
                   </div>
               </div>
           </div>        
       </div>

   </div> <!-------------------------------------------------------------- Row For Advance Search Bar Ends Here-->

   <div class="row result-container mt-2 ">  <!-- -------------------------Result container starts here---------------------------------------------- -->
           
   </div> <!-- -------------------------Result container ends here---------------------------------------------- -->

</section><!-- -------------------------container Ends here---------------------------------------------- -->

                      `;

let res;

async function getData(){     //onClick fuc on Search Input

    let searchedName = document.querySelector(".srch-value").value; 
     await fetch("https://api.nationalize.io/?name="+searchedName)
    .then(response => {                                               //'fetch().catch()' only detects network typed error;
                     if(response.status>=400 && response.status<600)  // so this code detects errors between 400-599;
                     {  
                        throw new Error("Please Type A Name");  //throwing error so it can stop here and called catch
                     }
                    else{ return response  } 
                      })
    .then(
       responed => {    res=responed;
                        showData();
                   }
    )   
    .catch(err =>{ gotAError(err);
                    // console.log(err,"Please Type a Name Or Check your Connection!") 
                });
    

    
    
}

async function showData(){

        const jsondata = await res.json();
        const resultCon = document.querySelector(".result-container");
        resultCon.innerHTML=` `; // so it wont repeat content after clicling multi-times on search button
       
        resultCon.style.border=" 13px ridge rgb(93 92 92)";
        resultCon.style.padding="80px";
        resultCon.style.opacity="1";

        //console.log(jsondata)
        if(jsondata.country.length!==0) 
        {
            resultCon.innerHTML=` <h4 class="text-center">Results :</h4> `;
           for(let i=1;i<=2;i++)
                {

                resultCon.innerHTML+=
                `
                
                <div class="col-lg-6 col-md-12 col-sm-12   d-flex justify-content-center">
                    <div class="card card-css m-4" >
                        <div class="card-header text-center">
                          <div class="pin m-auto" > <div></div> </div>        <!-- for Pin css -->                  
                            <h4>Result ${i}</h4>
                        </div>
                        <div class="card-body card-css-body">
                            <div class="d-flex  ml-4 ">
                                <h6 ><b>Nationality : </b></h6>
                                <p class="mx-3">   ${jsondata.country[i-1]["country_id"]}</p>
                            </div>
                            <div class="d-flex ml-4">
                                <h6><b>Probability : </b></h6>
                                <p class="mx-3">${jsondata.country[i-1]["probability"].toFixed(4)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                    
                
                `;
                //  console.log(jsondata.country);
                }
    
        //console.log(resultCon); 

        }else
        {
            gotAError("Result Not Found!");
        
        
        }
       

}

function gotAError(error)
{

            const resultCon = document.querySelector(".result-container");
            resultCon.innerHTML=` `; // so it wont repeat content after clicling multi-times on search button
            resultCon.style.border=" 10px rgb(255, 47, 47) ridge";
            resultCon.style.padding="80px";
            resultCon.style.opacity="1";
            
            resultCon.innerHTML+=`

            

                <div class="col-12  d-flex justify-content-center">
                    <div class="card card-css  m-4" >
                        <div class="card-header">
                          <div class="pin m-auto" >  <div></div> </div>                          
                        </div>
                        <div class="card-body m-5 text-secondary">                 
                            <div >
                                <h2 >${error}</h2>
                            </div>
                        </div>
                    </div>
                </div>       

        `;
        console.log(err,"Please Type a Name Or Check your Connection!") 

}