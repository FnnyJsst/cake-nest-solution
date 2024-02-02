import styled from "styled-components"
import { theme } from "../../../../../../theme"
import { GiCupcake } from "react-icons/gi";
import { FaCamera } from "react-icons/fa";
import { MdEuro } from "react-icons/md";
import { useState } from "react";
import { replaceFrenchCommaWithDot } from "../../../../../../utils/maths";


export default function AdminForm({ setMenu }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");

    const handleNameChange = (e) => {
        setProductName(e.target.value);
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePriceChange = (e) => {
        const price = e.target.value;
        if (!price) {
            console.log("Price is empty");
        }
        const priceDot = replaceFrenchCommaWithDot(price)
        setProductPrice(priceDot);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            id: Math.random(), // Générer un ID unique pour le nouveau produit
            title: productName,
            imageSource: selectedImage,
            price: productPrice
        };
        setMenu((prevMenu) => [...prevMenu, newProduct]);
    }
    return (
       
        <AdminFormStyled>
         {selectedImage ? <img src={selectedImage} alt="Selected" /> : <img src="../../../../../../../public/images/cupcake-item.png" alt="cupcake" />}
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <GiCupcake className="icon" />
                    <input 
                        type="text" 
                        placeholder="Nom du produit" 
                        value={productName} 
                        onChange={handleNameChange}/>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="imageUpload" className="icon">
                        <FaCamera />
                    </label>
                    <input 
                        className="inputImage" 
                        id="imageUpload" 
                        type="file" 
                        accept="image/*"
                        onChange= {handleImageChange} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MdEuro className="icon" />
                    <input 
                        type="text" 
                        placeholder="Prix" 
                        value={productPrice} 
                        onChange={handlePriceChange} />
                </div>
                <button type="submit">Ajouter un nouveau produit</button>
            </form>
        </AdminFormStyled>
    )
  }

const AdminFormStyled = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 4vh;
    
    form {
        display: flex;
        flex-direction: column;
    }

    img {
        height: 17vh;
    }
    
    input {
        border: none;
        background-color: #EBEDEF;
        margin: 8px 0;
        height: 5vh;
        width: 45vh;
        border-radius: 5px;  
        font: "Open Sans", sans-serif;
        font-size: ${theme.fonts.size.XS};
        padding-left: 30px;
    }

    .icon { 
        position: absolute;
        margin-left: 10px;
        color: ${theme.colors.greyDark};
    }
    
    button {
        border: none;
        background-color: ${theme.colors.success};
        color: white;
        height: 5vh;
        width: 30vh;
        border-radius: 5px;
    }`