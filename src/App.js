import "./App.css";
import "./SpinKit.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import update from "immutability-helper";
import { memo, useCallback, useState, useEffect } from "react";
import { Box } from "./Box";
import { ItemTypes } from "./ItemTypes.js";
import { Dustbin } from "./Dustbin.js";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import society from "./images/Society.png";
import cardanologo from "./images/cardanologo.png";
import amphilogo from "./images/rawamphi_small.png";
import switchicon from "./images/open-folder.png";
import saveicon from "./images/save.png";
import whitesaveicon from "./images/whitesave.png";
import erasericon from "./images/eraser.png";
import armoricon from "./images/chest-armor.png";
import weighticon from "./images/weight.png";
import levelupicon from "./images/levelup.png";
import levelupactive from "./images/levelup_active.png";
import reseticon from "./images/reset.png";
import cognitionicon from "./images/cognition.png";
import cognitionactive from "./images/cognition_active.png";
import conditioningicon from "./images/conditioning.png";
import conditioningactive from "./images/conditioning_active.png";
import precisionicon from "./images/precision.png";
import precisionactive from "./images/precision_active.png";
import proficiencyicon from "./images/proficiency.png";
import proficiencyactive from "./images/proficiency_active.png";
import leadershipicon from "./images/leadership.png";
import strategyicon from "./images/chess-pawn.png";
import craftingicon from "./images/anvil-impact.png";
import healthicon from "./images/health.png";
import speedicon from "./images/running-shoe.png";
import horsemanshipicon from "./images/cavalry.png";
import onehandshieldicon from "./images/battle-gear.png";
import twohandedicon from "./images/war-axe.png";
import polearmicon from "./images/glaive.png";
import bowicon from "./images/high-shot.png";
import throwingicon from "./images/thrown-spear.png";
import crossbowicon from "./images/crossbow.png";
import horseicon from "./images/horse-head.png";
import horsehealthicon from "./images/horsehealth.png";
import horsearmoricon from "./images/horsearmor.png";
import horsespeedicon from "./images/horsespeed.png";
import horsemaneuvericon from "./images/horsemaneuver.png";
import horsechargeicon from "./images/horsecharge.png";
import military_amphi from "./images/military_amphi.png";
import armoury_banner from "./images/armoury_splash.png"
import citizen_expbar from "./images/citizen_expbar.png"
import amphitheatre_textlogo from "./images/amphitheatre_textlogo.png"
import nakedape from "./images/nakedape.png"
import blankimage from "./images/blankimage.png"
import Loading from "./Loading.js";
import Connector from "./Connector.js";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-h5-audio-player/lib/styles.css";
import SearchBar from "./SearchBar.js";
import GearSlot from "./GearSlot.js"
import {
  Address,
  BaseAddress,
  MultiAsset,
  Assets,
  ScriptHash,
  Costmdls,
  Language,
  CostModel,
  AssetName,
  TransactionUnspentOutput,
  TransactionUnspentOutputs,
  TransactionOutput,
  Value,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  TransactionOutputBuilder,
  LinearFee,
  BigNum,
  encode_json_str_to_metadatum,
  GeneralTransactionMetadata,
  AuxiliaryData,
  BigInt,
  TransactionHash,
  TransactionInputs,
  TransactionInput,
  TransactionWitnessSet,
  Transaction,
  PlutusData,
  PlutusScripts,
  PlutusScript,
  PlutusList,
  Redeemers,
  Redeemer,
  RedeemerTag,
  Ed25519KeyHashes,
  ConstrPlutusData,
  ExUnits,
  Int,
  NetworkInfo,
  EnterpriseAddress,
  TransactionOutputs,
  hash_transaction,
  hash_script_data,
  hash_plutus_data,
  ScriptDataHash,
  Ed25519KeyHash,
  NativeScript,
  StakeCredential,
} from "@emurgo/cardano-serialization-lib-asmjs";
let Buffer = require("buffer/").Buffer;


// Establish Loadout GearBox Structure

function App() {
  const [dustbins_row1, setDustbins1] = useState([
    { accepts: [ItemTypes.HEAD], lastDroppedItem: null },
    { accepts: [ItemTypes.BODY], lastDroppedItem: null },
    { accepts: [ItemTypes.SHOULDERS], lastDroppedItem: null },
    { accepts: [ItemTypes.GLOVES], lastDroppedItem: null },
    { accepts: [ItemTypes.LEG], lastDroppedItem: null },
    { accepts: [ItemTypes.HORSEHARNESS], lastDroppedItem: null },
  ]);
  const [dustbins_row2, setDustbins2] = useState([
    { accepts: [ItemTypes.ITEM0], lastDroppedItem: null },
    { accepts: [ItemTypes.ITEM1], lastDroppedItem: null },
    { accepts: [ItemTypes.ITEM2], lastDroppedItem: null },
    { accepts: [ItemTypes.ITEM3], lastDroppedItem: null },
    { accepts: [ItemTypes.HORSE], lastDroppedItem: null },
    { accepts: [ItemTypes.SPECIAL], lastDroppedItem: null },
    
  ]);  
  var truncate = function (fullStr, strLen, separator) {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || "...";

    var sepLen = separator.length,
      charsToShow = strLen - sepLen,
      frontChars = Math.ceil(charsToShow / 2),
      backChars = Math.floor(charsToShow / 2);

    return (
      fullStr.substr(0, frontChars) +
      separator +
      fullStr.substr(fullStr.length - backChars)
    );
  };
  const [leftLoadoutColumnWidth, setLeftLoadoutColumnWidth] = useState(2);
  const [rightLoadoutColumnWidth, setRightLoadoutColumnWidth] = useState(2);
  const [showLeftInventory, setShowLeftInventory] = useState(false);
  const [showRightInventory, setShowRightInventory] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [inventoryTopPadding, setInventoryTopPadding] = useState("");
  const [inventoryBottomPadding, setInventoryBottomPadding] = useState("");
  function handleLeftDustbinClick (slot) {
    if (slot =="Head") {
      setInventoryTopPadding('0px')
      setInventoryBottomPadding('725px')
    }
    if (slot =="Body") {
      setInventoryTopPadding('145px')
      setInventoryBottomPadding('580px')
    }
    if (slot =="Shoulders") {
      setInventoryTopPadding('290px')
      setInventoryBottomPadding('435px')
    }
    if (slot =="Gloves") {
      setInventoryTopPadding('435px')
      setInventoryBottomPadding('290px')
    } 
    if (slot =="Leg") {
      setInventoryTopPadding('580px')
      setInventoryBottomPadding('145px')
    } 
    if (slot =="HorseHarness") {
      setInventoryTopPadding('725px')
      setInventoryBottomPadding('0px')
    } 
      setShowLeftInventory(true);
      setShowRightInventory(false);
      setSelectedSlot(slot);
      setLeftLoadoutColumnWidth(3);
      setRightLoadoutColumnWidth(1);
  }
  function handleRightDustbinClick(slot) {
    
      if (slot =="Item0") {
        setInventoryTopPadding('0px')
        setInventoryBottomPadding('725px')
        slot = "Item";
      }
      if (slot =="Item1") {
        setInventoryTopPadding('145px')
        setInventoryBottomPadding('580px')
        slot = "Item";
      }
      if (slot =="Item2") {
        setInventoryTopPadding('290px')
        setInventoryBottomPadding('435px')
        slot = "Item";
      }
      if (slot =="Item3") {
        setInventoryTopPadding('435px')
        setInventoryBottomPadding('290px')
        slot = "Item";
      } 
      if (slot =="Horse") {
        setInventoryTopPadding('580px')
        setInventoryBottomPadding('145px')
      } 
      if (slot =="Special") {
        setInventoryTopPadding('725px')
        setInventoryBottomPadding('0px')
      } 
    
      setShowLeftInventory(false);
      setShowRightInventory(true);
      setSelectedSlot(slot);
      setRightLoadoutColumnWidth(3);
      setLeftLoadoutColumnWidth(1);
  }
  const [beenHere, setBeenHere] = useState(false);
  const [inventoryPosition, setInventoryPosition] = useState(0);
  const [refreshToken, setRefreshToken] = useState(false);
  const [postedTransactions, setPostedTransactions] = useState([]);
  const [lookup, setLookup] = useState({});
  const [txHash, setTxHash] = useState(undefined);
  const [utxoSpent, setUtxoSpent] = useState(TransactionUnspentOutputs.new());
  const [whichWallet, setWhichWallet] = useState("");
  const [wallets, setWallets] = useState([]);
  const [term, setTerm] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noApe, setNoApe] = useState(false);
  const [noLoadout, setNoLoadout] = useState(false);
  const [walletAddress, setWalletAddress] = useState("No address set");
  const [walletContent, setWalletContent] = useState({});
  /* const [imageContent, setImageContent] = useState({}); */
  const [filtered, setFiltered] = useState({});
  const [gotContent, setGotContent] = useState(false);
  const [societyToken, setSocietyToken] = useState(0);
  const [adaToken, setAdaToken] = useState(0);
  const [lgShow, setLgShow] = useState(false);
  const [lgShowLoad, setLgShowLoad] = useState(false);
  const [apeSelected, setApeSelected] = useState(false);
  const [userLoadout, setUserLoadout] = useState({
    Ape: "",
    Head: "",
    Body: "",
    Shoulders: "",
    Gloves: "",
    Leg: "",
    Item0: "",
    Item1: "",
    Item2: "",
    Item3: "",
    Horse: "",
    HorseHarness: "",
    Special: "",
  });
  const [userLoadoutValues, setUserLoadoutValues] = useState({});
  const [searchList, setSearchList] = useState([]);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  let protocolParams = {
    linearFee: {
      minFeeA: "44",
      minFeeB: "155381",
    },
    minUtxo: "34482",
    poolDeposit: "500000000",
    keyDeposit: "2000000",
    maxValSize: 5000,
    maxTxSize: 16384,
    priceMem: 0.0577,
    priceStep: 0.0000721,
    coinsPerUtxoWord: "34482",
  };

  let API = undefined;
  const lovelaceToSend = 1001001;

  const [onChainLoadout, setOnChainLoadout] = useState([]);
  const [transformedLoadout, setTransformedLoadout] = useState({});

  useEffect(() => {
    pollWallets();
    lookupFunction();
    if (!apeSelected && Object.keys(filtered).length != 0) {
      setUserLoadout((prevUserLoadout) => ({
        ...prevUserLoadout,
        Ape: Object.keys(filtered)[0].slice(5),
      }));
      setApeSelected(true);
    }
    if (isLoading && gotContent) {
      simulateNetworkRequest().then(() => {
        setIsConnected(true);
        setIsLoading(false);
        // calculateAdaToken(balance);
        ResetDustbins();
      });
    }
  }, [isLoading, gotContent, userLoadout]);

  function onWalletContent(
    walletContent,
    filtered,
    userLoadoutContentArray,
    txUnspentOutput
  ) {
    if (walletContent != {}) {
      setWalletContent(walletContent);
      if (txUnspentOutput) {
        setUtxoSpent(txUnspentOutput);
      }
      if (Object.keys(filtered).length == 0) {
        setNoApe(true);
      } else {
        setNoApe(false);
        setFiltered(filtered);
      }
      if (userLoadoutContentArray.length == 0) {
        setNoLoadout(true);
      } else {
        setNoLoadout(false);
        setOnChainLoadout(userLoadoutContentArray);
        setSearchList(userLoadoutContentArray);
        transformOnchainLoadout();
      }
      setGotContent(true);
    }
  }

  function getTransactionsPosted(postedTransactions) {
    if (postedTransactions && !beenHere) {
      setBeenHere(true);
      setPostedTransactions(postedTransactions.reverse());
    }
  }

  function getChangeAddy(changeAddress) {
    if (changeAddress) {
      setWalletAddress(changeAddress);
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function calculateAdaToken(lovelace) {
    if (lovelace) {
      setAdaToken(lovelace/1000000);
    }
  }

  function simulateNetworkRequest() {
    if (walletContent["SOCIETY"] != undefined) {
      setSocietyToken(numberWithCommas(Math.trunc(walletContent["SOCIETY"] / 1000000)));
    } else {
      setSocietyToken(0);
    }
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleLoadout() {
    setLgShowLoad(true);
  }

  function onTermChange(event) {
    setTerm(event.target.value);
  }

  function onSubmitAddy(event) {
    setIsLoading(true);
  }

  function transformOnchainLoadout() {
    let transformedLoad = {};
    if (onChainLoadout != {}) {
      onChainLoadout.map(({ name, type, amount, image }, index) => {
        transformedLoad[name] = image;
      });
      setTransformedLoadout(transformedLoad);
    }
  }

  function handleEditWallet() {
    setIsConnected(false);
    setIsLoading(false);
    setNoLoadout(false);
    setNoApe(false);
    setGotContent(false);
    setApeSelected(false);
    setWalletContent({});
    setFiltered({});
    setBeenHere(false);
    setUserLoadout({
      Ape: "",
      Head: "",
      Body: "",
      Shoulders: "",
      Gloves: "",
      Leg: "",
      Item0: "",
      Item1: "",
      Item2: "",
      Item3: "",
      Horse: "",
      HorseHarness: "",
    });
    setUserLoadoutValues({});
  }
  function lookupFunction() {
    var lookup = {};
    for (var i = 0, len = onChainLoadout.length; i < len; i++) {
      lookup[onChainLoadout[i].name] = onChainLoadout[i];
    }
    setLookup(lookup);
  }

  function ResetDustbins() {
    setDustbins1([
      { accepts: [ItemTypes.HEAD], lastDroppedItem: null },
      { accepts: [ItemTypes.BODY], lastDroppedItem: null },
      { accepts: [ItemTypes.SHOULDERS], lastDroppedItem: null },
      { accepts: [ItemTypes.GLOVES], lastDroppedItem: null },
      { accepts: [ItemTypes.LEG], lastDroppedItem: null },
      { accepts: [ItemTypes.HORSEHARNESS], lastDroppedItem: null },      
      
    ]);
    setDustbins2([
      { accepts: [ItemTypes.ITEM0], lastDroppedItem: null },
      { accepts: [ItemTypes.ITEM1], lastDroppedItem: null },
      { accepts: [ItemTypes.ITEM2], lastDroppedItem: null },
      { accepts: [ItemTypes.ITEM3], lastDroppedItem: null },
      { accepts: [ItemTypes.HORSE], lastDroppedItem: null },
      { accepts: [ItemTypes.SPECIAL], lastDroppedItem: null },
      
    ]);
    setLeftLoadoutColumnWidth(2);
    setRightLoadoutColumnWidth(2);
    setShowLeftInventory(false);
    setShowRightInventory(false);
  }

  let loadoutValues = {};

  const [droppedLoadoutNames, setDroppedLoadoutNames] = useState([]);
  function isDropped(boxName) {
    return droppedLoadoutNames.indexOf(boxName) > -1;
  }


  //get loadouttotals function to calculate armour totals

  function getLoadoutTotals() {
    let points = 0
    let armor = 0;
    let weight = 0;
    let cognition = 0
    let conditioning = 0;
    let proficiency = 0
    let precision = 0
    let leadership = 0
    let strategy = 0
    let crafting = 0
    let health = 0;
    let horsemanship = 0
    let speed = 0
    let onehandshield = 0;
    let twohanded = 0
    let polearm = 0
    let bow = 0;
    let throwing = 0
    let crossbow = 0
    let horsehealth = 0
    let horsearmor = 0
    let horsespeed = 0;
    let horsemaneuver = 0
    let horsecharge = 0
    let horseweight = 0
    
    
    if (userLoadoutValues != {}) {
      Object.keys(userLoadoutValues).map((key, index) => {
        points += parseInt(userLoadoutValues[key]?.points || 0);
        armor += parseInt(userLoadoutValues[key]?.armor || 0);
        weight += parseInt(userLoadoutValues[key]?.weight || 0);
        cognition += parseInt(userLoadoutValues[key]?.cognition || 0);
        conditioning += parseInt(userLoadoutValues[key]?.conditioning || 0);
        proficiency += parseInt(userLoadoutValues[key]?.proficiency || 0);
        precision += parseInt(userLoadoutValues[key]?.precision || 0);
        leadership += parseInt(userLoadoutValues[key]?.leadership || 0);
        strategy += parseInt(userLoadoutValues[key]?.strategy || 0);
        crafting += parseInt(userLoadoutValues[key]?.crafting || 0);
        health += parseInt(userLoadoutValues[key]?.health || 0);
        horsemanship += parseInt(userLoadoutValues[key]?.horsemanship || 0);
        speed += parseInt(userLoadoutValues[key]?.cavalry || 0);
        onehandshield += parseInt(userLoadoutValues[key]?.onehandshield || 0);
        twohanded += parseInt(userLoadoutValues[key]?.twohanded || 0);
        polearm += parseInt(userLoadoutValues[key]?.polearm || 0);
        bow += parseInt(userLoadoutValues[key]?.bow || 0);
        throwing += parseInt(userLoadoutValues[key]?.throwing || 0);
        crossbow += parseInt(userLoadoutValues[key]?.crossbow || 0);
        horsehealth += parseInt(userLoadoutValues[key]?.horsehealth || 0);
        horsearmor += parseInt(userLoadoutValues[key]?.horsearmor || 0);
        horsespeed += parseInt(userLoadoutValues[key]?.horsespeed || 0);
        horsemaneuver += parseInt(userLoadoutValues[key]?.horsemaneuver || 0);
        horsecharge += parseInt(userLoadoutValues[key]?.horsecharge || 0);
        horseweight += parseInt(userLoadoutValues[key]?.horseweight || 0);
      });
    }
    return {
      points: points,
      armor: armor,
      weight: weight,
      cognition: cognition,
      conditioning: conditioning,
      proficiency: proficiency,
      precision: precision,
      leadership: leadership,
      strategy: strategy,
      crafting: crafting,
      health: health,
      horsemanship: horsemanship,
      speed: speed,
      onehandshield: onehandshield,
      twohanded: twohanded,
      polearm: polearm,
      bow: bow,
      throwing: throwing,
      crossbow: crossbow,
      horsehealth: horsehealth,
      horsearmor: horsearmor,
      horsespeed: horsespeed,
      horsemaneuver: horsemaneuver,
      horsecharge: horsecharge,
      horseweight: horseweight,
    };
  }

  const handleDrop1 = useCallback(
    (index, item, accepts) => {
      setUserLoadout((prevUserLoadout) => ({
        ...prevUserLoadout,
        [accepts[0]]: item.name,
      }));
      setUserLoadoutValues((prevUserLoadout) => ({
        ...prevUserLoadout,
        [lookup[item.name]?.slot]: lookup[item.name],
      }));

      const { name } = item;

      setDroppedLoadoutNames(
        update(droppedLoadoutNames, name ? { $push: [name] } : { $push: [] })
      );

      setDustbins1(
        update(dustbins_row1, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      );
    },
    [droppedLoadoutNames, dustbins_row1]
  );

  const handleDrop2 = useCallback(
    (index, item, accepts) => {
      setUserLoadout((prevUserLoadout) => ({
        ...prevUserLoadout,
        [accepts[0]]: item.name,
      }));
      setUserLoadoutValues((prevUserLoadout) => ({
        ...prevUserLoadout,
        [lookup[item.name]?.slot]: lookup[item.name],
      }));
      const { name } = item;
      const { amount } = item;
      setDroppedLoadoutNames(
        update(
          droppedLoadoutNames,
          name && amount ? { $push: [name], $push: [amount] } : { $push: [] }
        )
      );
      setDustbins2(
        update(dustbins_row2, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      );
    },
    [droppedLoadoutNames, dustbins_row2]
  );

  const handleDrop3 = useCallback(
    /* camel */
    (index, item, accepts) => {
      setUserLoadout((prevUserLoadout) => ({
        ...prevUserLoadout,
        [accepts[0]]: item.name,
      }));
      setUserLoadoutValues((prevUserLoadout) => ({
        ...prevUserLoadout,
        [lookup[item.name]?.slot]: lookup[item.name],
      }));
      const { name } = item;
      setDroppedLoadoutNames(
        update(droppedLoadoutNames, name ? { $push: [name] } : { $push: [] })
      );
    },
  );

  function apeUpdateInfo(event) {
    setApeSelected(true);
    setUserLoadout((prevUserLoadout) => ({
      ...prevUserLoadout,
      Ape: Object.keys(filtered)[event].slice(5),
    }));
  }

  function handleWalletSelect(val) {
    const whichWalletSelected = val.target.text;

    setWhichWallet(whichWalletSelected);
  }

  function handleIsError(error) {
    if (error) {
      toast.error("Error connecting to wallet. Please try again", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setIsLoading(false);
      setIsConnected(false);
    }
  }

  function pollWallets(count = 0) {
    const wallets = [];
    for (const key in window.cardano) {
      if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
        wallets.push(key);
      }
    }
    if (wallets.length === 0 && count < 3) {
      setTimeout(() => {
        pollWallets(count + 1);
      }, 1000);
      return;
    }

    setWallets(wallets);
  }

  const notifyError = () => {
    toast.error(
      "Something went wrong. Please refresh and try again. Make sure you have enough ada in your wallet to cover your assets in change address.",
      {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    setLgShow(false);
  };

  const notify = () => {
    toast.success("Transaction submitted. Please check your wallet.", {
      position: "top-left",
      autoClose: 15000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setLgShow(false);
    //setRefreshToken(true);
  };
  const enableWallet = async () => {
    const walletKey = whichWallet;
    try {
      API = await window.cardano[walletKey].enable();
    } catch (err) {
      console.log(err);
      notifyError();
    }
  };

  const initTransactionBuilder = async () => {
    const txBuilder = TransactionBuilder.new(
      TransactionBuilderConfigBuilder.new()
        .fee_algo(
          LinearFee.new(
            BigNum.from_str(protocolParams.linearFee.minFeeA),
            BigNum.from_str(protocolParams.linearFee.minFeeB)
          )
        )
        .pool_deposit(BigNum.from_str(protocolParams.poolDeposit))
        .key_deposit(BigNum.from_str(protocolParams.keyDeposit))
        .coins_per_utxo_word(BigNum.from_str(protocolParams.coinsPerUtxoWord))
        .max_value_size(protocolParams.maxValSize)
        .max_tx_size(protocolParams.maxTxSize)
        .prefer_pure_change(true)
        .build()
    );

    return txBuilder;
  };

  const buildSendADATransaction = async () => {
    try {
      await enableWallet();
      const generalMetadata = GeneralTransactionMetadata.new();
      const auxiliaryData = AuxiliaryData.new();
      const txBuilder = await initTransactionBuilder();
      const shelleyOutputAddress = Address.from_bech32(walletAddress);
      const shelleyChangeAddress = Address.from_bech32(walletAddress);

      generalMetadata.insert(
        BigNum.from_str("1888"),
        encode_json_str_to_metadatum(JSON.stringify(userLoadout))
      );

      if (generalMetadata.len() > 0) {
        auxiliaryData.set_metadata(generalMetadata);
      }

      if (auxiliaryData) {
        txBuilder.set_auxiliary_data(auxiliaryData);
      }

      txBuilder.add_output(
        TransactionOutput.new(
          shelleyOutputAddress,
          Value.new(BigNum.from_str(lovelaceToSend.toString()))
        )
      );

      // Find the available UTXOs in the wallet and
      // us them as Inputs
      const txUnspentOutputs = utxoSpent;
      txBuilder.add_inputs_from(txUnspentOutputs, 0);

      // calculate the min fee required and send any change to an address
      txBuilder.add_change_if_needed(shelleyChangeAddress);

      // once the transaction is ready, we build it to get the tx body without witnesses
      const txBody = txBuilder.build();

      // Tx witness
      const transactionWitnessSet = TransactionWitnessSet.new();

      const tx = Transaction.new(
        txBody,
        TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes()),
        txBuilder.get_auxiliary_data()
      );

      let txVkeyWitnesses = await API.signTx(
        Buffer.from(tx.to_bytes(), "utf8").toString("hex"),
        true
      );

      console.log(txVkeyWitnesses);

      txVkeyWitnesses = TransactionWitnessSet.from_bytes(
        Buffer.from(txVkeyWitnesses, "hex")
      );

      transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

      const signedTx = Transaction.new(
        tx.body(),
        transactionWitnessSet,
        tx.auxiliary_data()
      );

      const submittedTxHash = await API.submitTx(
        Buffer.from(signedTx.to_bytes(), "utf8").toString("hex")
      );

      if (submittedTxHash) {
        await setTxHash(submittedTxHash);
        notify();
      }
      console.log(submittedTxHash);
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };

  let acceptsItem = ["Item"];

  function OnInputSubmit(term) {
    const List = onChainLoadout.filter((obj) => {
      if (
        obj["name"].toLowerCase().includes(term) ||
        obj["slot"].toLowerCase().includes(term)
      ) {
        return obj;
      }
    });
    setSearchList(List);
  }

  return (
    <div className="homepage">
      {/*
        <ReactAudioPlayer
          src="http://docs.google.com/uc?export=open&id=1g0-HJ2l1bHvuEIBqiASD5JEn08bNHRY9"
          autoPlay
          controls
        />
      */}
      <Container>
      <Row className="d-flex justify-content-center" style={{paddingTop: "20px"}}>
      <Col xs={2} className="d-flex justify-content-start align-items-start">
      <div style={{ paddingTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "nowrap", width: "100%" }}>
            {wallets ? (
              <Dropdown>
                <Dropdown.Toggle
                  className="button_tas_1"
                  id="dropdown-basic"
                  style={{
                    fontFamily: "Cabin",
                    backgroundColor: "#00000000"
                  }}
                >
                  Wallet: {capitalizeFirstLetter(whichWallet)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {wallets.map((val) => {
                    console.log();
                    return (
                      <Dropdown.Item
                        key={val}
                        onClick={(val) => {
                          handleWalletSelect(val);
                        }}
                      >
                        <img
                          src={window.cardano[val].icon}
                          width={24}
                          height={24}
                        />
                        {val}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown> 
            ) : (
              ""
            )}
            
            {isConnected ? (
              <div className="d-flex flex-column justify-content-start align-items-start">
                    <Button onClick={handleEditWallet} className="button_tas_1">
                    Disconnect
                    </Button>
                </div>
             ):(
              <div className="d-flex flex-column justify-content-start align-items-start">
                <Button disabled={!whichWallet} className="button_tas_2"   style={{ width: "100px" }} onClick={onSubmitAddy} >
                  Connect
                </Button>
              </div>
             )}
             </div>
             </Col>
             <Col xs={8} className="text-center">
             {isConnected ? (
              <div style={{color: "#ead5c2"}}>
              
              
                <img src={society} style={{ width: "35px" }} />
                {" "}{societyToken} | {truncate(walletAddress, 11)} | {adaToken}{" "}
                <img src={cardanologo} style={{ width: "35px" }} />
            </div>
            ): (
              ""
            )}
            </Col>
            <Col xs={2} className="d-flex justify-content-end align-items-start">
            {isConnected ? (
              <img width="200%" src={amphitheatre_textlogo} />
            ): (
              ""
            )}
            </Col>
          </Row>
            <Modal
              size="lg"
              show={lgShowLoad}
              onHide={() => setLgShowLoad(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Body bsPrefix="modal-bg">
                <div
                  className="modal-title"
                  style={{ fontFamily: "Cabin, sans-serif" }}>
                     <div style={{ display: "flex", justifyContent: "center", paddingBottom: "15px"}}>
                      <img src={military_amphi} style={{ width: "50px"}} />
                    </div>
                    <h2 style={{ paddingBottom: "25px" }}>
                      {" "}Your On-Chain Loadouts{" "}
                  </h2>
                  {postedTransactions.map((key, index) => {
                    return (
                      <a
                        href={`https://cardanoscan.io/transaction/${key}?tab=metadata`}
                        target="_blank"
                      >
                        <p style={{ fontSize: "16px" }}>{key}</p>
                        <br />
                      </a>
                    );
                  })}
                </div>
                <div className="modal-button" style={{ paddingTop: "0px" }}>
                  <Button
                    className="button_tas_1"
                    style={{
                      float: "right",
                      width: "100px",
                      fontSize: "18px",
                      fontFamily: "Cabin, sans-serif",
                    }}
                    onClick={() => setLgShowLoad(false)}
                  >
                    Close
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          
        
{isConnected ? (
  <Row>
    <Col className="col-12">
    {/*<img src={citizen_expbar}/> 
    */}
            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Body bsPrefix="modal-bg">
		            <div style={{ display: "flex", justifyContent: "center", paddingBottom: "15px"}}>
                  <img src={military_amphi} style={{ width: "50px"}} />
                 </div>
                <div
                  className="modal-title"
                  style={{ fontFamily: "Cabin, sans-serif" }}
                >
                  <h2> Confirm your selection </h2>
                </div>
                {Object.keys(userLoadout).map((key, index) => {
                  return (
                    <p
                      key={index}
                      style={{
                        paddingTop: "5px",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      {capitalizeFirstLetter(key)} - {userLoadout[key]}
                    </p>
                  );
                })}{" "}
                <div class="characterstats">
                  {//need to include something that warns the user when they haven't use their attribute points 
                  }
                  <p> <img src={armoricon} style={{ width: "30px" }} /> {getLoadoutTotals()["armor"]} </p>{" "}
                  <p> <img src={weighticon} style={{ width: "30px" }} /> {getLoadoutTotals()["weight"]} </p>{" "}                            
                  <p> <img src={leadershipicon} style={{ width: "30px" }} /> {getLoadoutTotals()["leadership"]} </p>{" "}
                  <p> <img src={strategyicon} style={{ width: "30px" }} /> {getLoadoutTotals()["strategy"]} </p>{" "}
                  <p> <img src={craftingicon} style={{ width: "30px" }} /> {getLoadoutTotals()["crafting"]} </p>{" "}
                  <p> <img src={healthicon} style={{ width: "30px" }} /> {getLoadoutTotals()["health"]} </p>{" "}
                  <p> <img src={speedicon} style={{ width: "30px" }} /> {getLoadoutTotals()["speed"]} </p>{" "}
                  <p> <img src={horsemanshipicon} style={{ width: "30px" }} /> {getLoadoutTotals()["horsemanship"]} </p>{" "}            
                  <p> <img src={onehandshieldicon} style={{ width: "30px" }} /> {getLoadoutTotals()["onehandshield"]} </p>{" "}
                  <p> <img src={twohandedicon} style={{ width: "30px" }} /> {getLoadoutTotals()["twohanded"]} </p>{" "}
                  <p> <img src={polearmicon} style={{ width: "30px" }} /> {getLoadoutTotals()["polearm"]} </p>{" "}            
                  <p> <img src={bowicon} style={{ width: "30px" }} /> {getLoadoutTotals()["bow"]} </p>{" "}
                  <p> <img src={throwingicon} style={{ width: "30px" }} /> {getLoadoutTotals()["throwing"]} </p>{" "}
                  <p> <img src={crossbowicon} style={{ width: "30px" }} /> {getLoadoutTotals()["crossbow"]} </p>{" "}            
                  <p> <img src={horsehealthicon} style={{ width: "30px" }} /> {getLoadoutTotals()["horsehealth"]} </p>{" "}
                  <p> <img src={horsearmoricon} style={{ width: "30px" }} /> {getLoadoutTotals()["horsearmor"]} </p>{" "}            
                  <p> <img src={horsespeedicon} style={{ width: "30px" }} /> {getLoadoutTotals()["horsespeed"]} </p>{" "}
                  <p> <img src={horsemaneuvericon} style={{ width: "30px" }} /> {getLoadoutTotals()["horsemaneuver"]} </p>{" "}
                  <p> <img src={horsechargeicon} style={{ width: "30px" }} /> {getLoadoutTotals()["horsecharge"]} </p>{" "}            
                  <p> <img src={weighticon} style={{ width: "30px" }} /> {getLoadoutTotals()["horseweight"]} </p>{" "}            
                </div>
                <div className="modal-button ">
                  <Button className="button_tas_1" style={{marginRight: "10px"}} onClick={() => setLgShow(false)}>
                    Cancel
                  </Button>
                  <Button variant="success" className="button_tas_2"onClick={() => buildSendADATransaction()}>
                    Confirm
                  </Button>
                </div>
      </Modal.Body>
    </Modal>
  </Col>
</Row>
) : "" }        
        {isConnected ? (
          <Row className="justify-content-center">
              <Col className="text-center">
              <Row className="d-flex">
              < Col xs={2} className="d-flex justify-content-start align-items-center">
                <div className="readyButton text-center">
                  <Button
                    variant="light"
                    onClick={handleLoadout}
                    className="button_tas_1">
                    <img src={switchicon} style={{ width: "25px"}}/>
                  </Button>
                  <Button variant="light" onClick={ResetDustbins} className="button_tas_1">
                    <img src={reseticon} style={{ width: "25px"}}/>
                  </Button>
                  <Button variant="light" className="button_tas_1">
                          <img src={erasericon} style={{ width: "25px"}}/>
                  </Button>
                 </div>             
                </Col>
                < Col xs={8} className="d-flex justify-content-start align-items-start">
              <div class="armour_totals_top" d-flex>

                <p><img src={leadershipicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["leadership"]} </p>{" "}
                <p><img src={strategyicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["strategy"]} </p>{" "}
                <p><img src={craftingicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["crafting"]} </p>{" "}

                <p style={{paddingLeft: "30px"}}><img src={healthicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["health"]} </p>{" "}
                <p><img src={speedicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["speed"]} </p>{" "}
                <p><img src={horsemanshipicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["horsemanship"]} </p>{" "}

                <p style={{paddingLeft: "30px"}}><img src={onehandshieldicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["onehandshield"]} </p>{" "}
                <p><img src={twohandedicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["twohanded"]} </p>{" "}
                <p><img src={polearmicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["polearm"]} </p>{" "}

                <p style={{paddingLeft: "30px"}}><img src={bowicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["bow"]} </p>{" "}
                <p><img src={throwingicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["throwing"]} </p>{" "}
                <p><img src={crossbowicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["crossbow"]} </p>{" "}
                
              </div>
              </Col>
              < Col xs={2} className="d-flex justify-content-end align-items-center">
                    {!noLoadout ? (
                      <div className="readyButton text-center">
                        <Button disabled={!isConnected} variant="success" className="button_tas_2" onClick={() => {setLgShow(true);}}>
                          <img src={whitesaveicon} style={{ width: "25px"}}/>
                        </Button>
                      </div> 
                
                    ) : (
                    ""
                    )}
                </Col>
              </Row>
              <Row className="d-flex">
              <div class="armour_totals_line" d-flex>
              </div>
              </Row>
              <Row className="d-flex">
              < Col xs={1} className="d-flex justify-content-start align-items-center">
                <div className="readyButton text-center">
                 </div>             
                </Col>
                < Col xs={10} className="d-flex justify-content-start align-items-start">
                  <div class="armour_totals_bottom" d-flex>

                  <p><img src={levelupicon} style={{ width: "35px", paddingLeft: "10px"}}/>  {getLoadoutTotals()["points"]} </p>{"  "}
                  <p style={{paddingLeft: "30px"}}><img src={cognitionicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["cognition"]} </p>{" "}
                  <p><img src={conditioningicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["conditioning"]} </p>{" "}
                  <p><img src={proficiencyicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["proficiency"]} </p>{" "}
                  <p><img src={precisionicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["precision"]} </p>{" "}
                

                <div style={{ display: 'none' }}>
                    <p style={{paddingLeft: "30px"}}><img src={horseicon} style={{ width: "35px", paddingLeft: "10px"}}/></p>{"  "}
                    <p><img src={horsehealthicon} style={{ width: "35px", paddingLeft: "10px"}}/>  {getLoadoutTotals()["horsehealth"]} </p>{"  "}
                    <p><img src={horsearmoricon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["horsearmor"]} </p>{" "}                
                    <p><img src={horsespeedicon} style={{ width: "35px", paddingLeft: "10px"}}/>  {getLoadoutTotals()["horsespeed"]} </p>{"  "}
                    <p><img src={horsemaneuvericon} style={{ width: "35px", paddingLeft: "10px"}}/>  {getLoadoutTotals()["horsemaneuver"]} </p>{"  "}
                    <p><img src={horsechargeicon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["horsecharge"]} </p>{" "}
                    <p><img src={weighticon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["horseweight"]} </p>{" "}
                </div>

                <p style={{paddingLeft: "30px"}}><img src={armoricon} style={{ width: "35px", paddingLeft: "10px"}}/>  {getLoadoutTotals()["armor"]} </p>{"  "}
                <p><img src={weighticon} style={{ width: "35px", paddingLeft: "10px"}}/> {getLoadoutTotals()["weight"]} </p>{" "}                

                  </div>
                </Col>
                < Col xs={1} className="d-flex justify-content-end align-items-center">
                <div className="readyButton text-center">
                 </div>             
                </Col>
                
              </Row>
            </Col>
          </Row>
          
        ) : (
          ""
        )}
      
        {isConnected ? (
           <Row className="d-flex justify-content-center">           
            <Col xs={(leftLoadoutColumnWidth)} className="d-flex justify-content-end align-items-start">
              <Row className="d-flex">
              < Col xs={6} className="d-flex justify-content-start align-items-start">
              {showLeftInventory && (
                <div class="inventory" style={{ "padding-top": `${inventoryTopPadding}`, "padding-bottom": `${inventoryBottomPadding}` }}>
                  {searchList
                    .filter(item => item.slot == selectedSlot)
                    .map(
                      (
                        {
                          name,
                          slot,
                          amount,
                          armor,
                          image,
                          weight,
                          tier
                        },
                        index
                      ) => (
                        <Row style={{ justifyContent: "center", display: "grid" }}>
                          <Col>
                            <Box
                              name={name}
                              type={slot}
                              isDropped={isDropped(name)}
                              key={index}
                              img={image}
                              armor={armor}
                            />
                            <div style={{ textAlign: "center" }}>                          
                            </div>
                          </Col>
                        </Row>
                      )
                    )}
                  </div>
                  )}
            </Col>
              <Col xs={6} className="d-flex justify-content-end">
                  <div className="d-flex flex-column justify-content-start align-items-start">
                  {dustbins_row1.map(({ accepts, lastDroppedItem}, index) => (
                    <Dustbin 
                      accept={accepts}
                      lastDroppedItem={lastDroppedItem}
                      onDrop={(item) => {
                      handleDrop1(index, item, accepts);
                        }}
                      onClick={() => handleLeftDustbinClick(accepts)} 
                      key={index}
                      img={
                    lastDroppedItem
                    ? transformedLoadout[lastDroppedItem["name"]]
                    : ""
                      }
                    />
                    ))}
                    </div>
                </Col>
            </Row>
            </Col>
            <Col xs={8} className="text-center">
              <div className="big_box">
                <Carousel
                  width="100%"
                  showIndicators={false}
                  onChange={apeUpdateInfo}
                  onClickItem={apeUpdateInfo}
                >
                  {filtered
                    ? Object.keys(filtered) &&
                      Object.keys(filtered).map((val, index) => {
                        return <img src={filtered[val]} key={index} />;
                      })
                    : ""}
                </Carousel>
              </div>
            </Col>
            <Col xs={(rightLoadoutColumnWidth)} className="d-flex flex-column justify-content-start">
            <Row className="d-flex">
              < Col xs={6} className="d-flex justify-content-start align-items-start">
              <div className="d-flex flex-column justify-content-start align-items-start">
                {dustbins_row2.map(({ accepts, lastDroppedItem }, index) => (
                  <Dustbin
                              accept={
                                accepts[0] === "Item0" ||
                                accepts[0] === "Item1" ||
                                accepts[0] === "Item2" ||
                                accepts[0] === "Item3"
                                  ? acceptsItem
                                  : accepts
                              }
                              lastDroppedItem={lastDroppedItem}
                              onClick={() => handleRightDustbinClick(accepts)} 
                              onDrop={(item) => {
                                if (
                                  accepts === "Item0" ||
                                  accepts === "Item1" ||
                                  accepts === "Item2" ||
                                  accepts === "Item3"
                                ) {
                                  accepts = "Item";
                                }
                                handleRightDustbinClick(accepts);
                                handleDrop2(index, item, accepts);
                              }}
                              key={index}
                              img={
                                lastDroppedItem
                                  ? transformedLoadout[lastDroppedItem["name"]]
                                  : ""
                              }
                      />
                      ))}
                </div>
              </Col>
              < Col xs={6} className="d-flex justify-content-start align-items-start">
              {showRightInventory && (
                  <div class="inventory" style={{ "padding-top": `${inventoryTopPadding}`, "padding-bottom": `${inventoryBottomPadding}` }}>
                  {searchList
                    .filter(item => item.slot == selectedSlot)
                    .map(
                      (
                        {
                          name,
                          slot,
                          amount,
                          image,
                          weight,
                          armor,
                          tier
                        },
                        index
                      ) => (
                        <Row style={{ justifyContent: "center", display: "grid" }}>
                          <Col>
                            <Box
                              name={name}
                              type={slot}
                              isDropped={isDropped(name)}
                              key={index}
                              img={image}
                            />
                            <div style={{ textAlign: "center" }}>                          
                            </div>
                          </Col>
                        </Row>
                      )
                    )}
                  </div>
                  )}
                </Col>
              </Row>
            </Col>   
          </Row>
        ) : (
          ""
        )}              
        {!isConnected && !isLoading ? (
          /* this might where we want to integrate steam and xbox and epic */
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "75vh"}}>
            <img src={armoury_banner} alt="Armoury banner" width="75%" style={{maxWidth: "600px"}}/>
          </div>
        ) : (
          ""
        )}
      </Container>
      {isLoading ? (
          <div>
            {" "}
            <Connector
              walletContent={onWalletContent}
              getChange={getChangeAddy}
              filtered={onWalletContent}
              whichWalletSet={whichWallet}
              isError={handleIsError}
              userLoadoutContentArray={onWalletContent}
              getTransactions={getTransactionsPosted}
            />
            {!refreshToken ? <Loading /> : ""}
          </div>
        ) : (
          ""
        )}
    </div>
  );
}
 export default App;