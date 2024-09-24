'strict mode';
const form = document.getElementsByTagName('form')[0];
const siteName = document.getElementById('siteName');
const siteUrl = document.getElementById('siteUrl');
const create = document.getElementById('create');
const update = document.getElementById('update');
const search = document.getElementById('search');
const tbody = document.getElementById('tbody');
const layer = document.querySelector('.layer');


// Start Project

form.addEventListener('submit',function(e){
 e.preventDefault();
})

// Start Create



create.onclick = Create;

let arr;
if(localStorage.getItem('product') != null)
{
    arr = JSON.parse(localStorage.product);
}
else{
    arr = [];
}
function Create()
{
    let pro = {
        sitename:siteName.value,
        siteurl:siteUrl.value,
    }
    if(siteName.value != '' && siteName.classList.contains('is-valid') && siteUrl.value != '' && siteUrl.classList.contains('is-valid'))
    {
        arr.push(pro);
        localStorage.setItem('product',JSON.stringify(arr));
    }
    else if(siteName.value === '' && siteUrl.value === '')
    {
        layer.classList.replace('d-none','d-flex');
    }
   layer.onclick = function(){
    layer.classList.replace('d-flex','d-none');
   }
    ClearForm();
    ShowData();
}
// End Create

// Start Clear Form
function ClearForm()
{
    siteName.value = '';
    siteUrl.value = null;
}
// End Clear Form

// Start Display 
function ShowData()
{
  let Cartoona = '';
  for(let i = 0; i < arr.length; i++)
  {
    Cartoona+= `
                <tr>
                <td class="pt-3">${i}</td>
                <td class="pt-3">${arr[i].sitename}</td>
                <td class="pt-3"><button onclick='setUpFormForUpdate(${i})' class="btn btn-warning"><i class="fa-solid fa-pen"></i> Update</button></td>
                <td class="pt-3"><a target='_blank' href='https://${arr[i].siteurl}'><button class="btn btn-primary"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                <td class="pt-3"><button onclick='Delete(${i})' class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
    `;
  }

  tbody.innerHTML = Cartoona;

}
ShowData();
// End Display 

// Start Update
let updatedIndex;
function setUpFormForUpdate(index)
{
    updatedIndex = index;
  siteName.value = arr[index].sitename;
  siteUrl.value = arr[index].siteurl; 
  create.classList.add('d-none');
  update.classList.replace('d-none','d-block');  
  window.scroll({
    top:0,left:0,behavior:'smooth',
  })
}
update.onclick = Update;
function Update()
{
    arr[updatedIndex].sitename = siteName.value;
    arr[updatedIndex].siteurl = siteUrl.value;
    localStorage.setItem('product',JSON.stringify(arr));
    create.classList.remove('d-none');
    update.classList.replace('d-block','d-none');
    ClearForm();
    ShowData();
}
// End Update

// Start Delete
function Delete(D)
{
 arr.splice(D,1);
 localStorage.product = JSON.stringify(arr);
 ShowData();
}
// End Delete

// Start Search
function Search(value){
    let Cartoona = '';

    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i].sitename.toLowerCase().includes(value.toLowerCase())){
         Cartoona+=`
              <tr>
                <td class="pt-3">${i}</td>
                <td class="pt-3">${arr[i].sitename}</td>
                <td class="pt-3"><button onclick='setUpFormForUpdate(${i})' class="btn btn-warning"><i class="fa-solid fa-pen"></i> Update</button></td>
                <td class="pt-3"><a target='_blank' href='https://${arr[i].siteurl}'><button class="btn btn-primary"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                <td class="pt-3"><button onclick='Delete(${i})' class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
         `;
        }
    }
    tbody.innerHTML = Cartoona;
    
}
// End Search

// Start Validation Form
function ValidationForm(element)
{
   let regex = {
    siteName:/^[A-Z][a-z]{4,15}$/,
    siteUrl:/^(www|WWW)[\.]{1}\w{4,20}[\.](com|Com)$/,
   }
  if(regex[element.id].test(element.value) == true)
  {
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
    element.nextElementSibling.classList.replace('d-block','d-none');    
  }
  else{
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    element.nextElementSibling.classList.replace('d-none','d-block');       
  }



}
// End Validation Form

// End Project
