import React, { useState, useEffect} from 'react';
import { PageHOC, CustomButton, CustomInput, GameLoad } from '../components';
import { useNavigate } from 'react-router-dom';
import styles from '../styles';
import { useGlobalContext } from '../context ';


const CreateBattle = () => {
  const [waitBattle, setWaitBattle] = useState(false);
  const { contract, battleName, setBattleName, gameData, setErrorMessage } = useGlobalContext();

  useEffect(()=>{

    if(gameData?.activeBattle?.battleStatus === 1 ){
      navigate(`/battle/${gameData.activeBattle.name}`)
    }
    else if(gameData?.activeBattle?.battleStatus === 0){
      setWaitBattle(true)
    }
  }, [gameData])

  const handleClick = async () =>{
    if(!battleName || !battleName.trim()) return null;
    try {
      await contract.createBattle(battleName, {gasLimit: 200000})
      setWaitBattle(true)
    } catch (error) {
      setErrorMessage(error)
    }
  }


  const navigate = useNavigate();

  return (
    <>
    { waitBattle && <GameLoad />}
      <div className='flex flex-col mb-5'>
        <CustomInput 
          label="Battle"
          placeholder="Enter battle Name"
          value={battleName}
          handleValueChange={setBattleName}
        />

        <CustomButton 
          title="Create Battle"
          handleClick={handleClick}
          restStyles="mt-6"
        />

      </div>
      <p className={styles.infoText} onClick={ ()=> navigate('/join-battle')}>Or join already exisiting battles</p>
    </>
  )
};

export default PageHOC(
    CreateBattle,
  <>Create <br /> a new Battle </>,
  <>Create your own battle and wait for others players to join</>
);