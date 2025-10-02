import supabase, {supabaseUrl} from "./supabase.js";

export async function getCabins(){

const { data, error } = await supabase
  .from('Cabins')
  .select('*')
if(error){
    console.log(error);
    throw new Error("Cabins could not be loaded'")
}
return data
}
export async function deleteCabin(id){

const { data, error } = await supabase
  .from('Cabins')
  .delete({ other_column: 'otherValue' })
  .eq('id', id)
if(error){
    console.log(error);
    throw new Error("Cabin could not be deleted '")
}
return data
}
export async function createEditCabin(newCabin,id){
    console.log(newCabin,id)
    const hasImagePath=newCabin.image?.startsWith?.(supabaseUrl);
    const imageName=`${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
    const imagePath=hasImagePath?newCabin.image:`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    //1 Create/edit cabin
    let query=  supabase.from("Cabins");
    if(!id) query=query
  .insert([{
      ...newCabin,
      image: imagePath,
  }  ]);
    //2 B Edit cabin
    if(id) query= query.update({
      ...newCabin,
      image: imagePath,
  })
  .eq('id', id)
  .select()
    const{data, error}=await query .select().single();

    if(error){
    console.log(error);
    throw new Error("Cabin could not be ceated '")
}
    //2 Upload image
    if(hasImagePath)return data;
    const { error:storageError} = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image);
    //3 DElete the cabin if there was an error
    if(storageError){
        await supabase
  .from('Cabins')
  .delete({ other_column: 'otherValue' })
  .eq('id', data.id)
         console.log(storageError);
    throw new Error("Cabin image could not be uploaded and cabin was not created");
    }
return data
}