import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Carousel } from "react-responsive-carousel";
import update from "immutability-helper";
import { useCallback, useState, useEffect } from "react";
import { Box } from "./Box";
import { classTooltips, generalTooltips } from './dynamicTooltipHelper.js';
import { ItemTypes } from "./ItemTypes.js";
import { Dustbin } from "./Dustbin.js";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import openloadoutsound from "./audio/book_ui_1.wav";
import pageuisound from "./audio/book_ui_3.wav";
import eraseruisound from "./audio/book_ui_4.wav";
import wooduisound from "./audio/wooden_ui_5.wav";
import audiouisound from "./audio/wooden_ui_4.wav";
import recenteruisound from "./audio/wooden_ui_2.wav";
import chainuisound from "./audio/chain_ui_2.wav";
import singleresetsound from "./audio/chain_ui_1.wav";
import armoruisound from "./audio/armor_ui_1.wav";
import armoruiequipsound from "./audio/armor_ui_2.wav";
import weaponuisound from "./audio/weapon_ui_2.wav";
import weaponuiequipsound from "./audio/weapon_ui_3.wav";
import saveloadoutbuttonsound from "./audio/weapon_ui_4.wav";
import horseuisound from "./audio/horse_ui_2.wav";
import society from "./images/Society.png";
import craftsmanicon from "./images/craftsman_amphi_icon.png";
import artisticon from "./images/artist_amphi_icon.png";
import explorericon from "./images/explorer_amphi_icon.png";
import merchanticon from "./images/merchant_amphi_icon.png";
import moicon from "./images/military_amphi_icon.png";
import raicon from "./images/royaladvisor_amphi.png";
import nobleicon from "./images/noble_amphi.png";
import amphilogo from "./images/rawamphi_small.png";
import switchicon from "./images/open-folder.png";
import soundicon from "./images/speaker.png";
import recentericon from "./images/recenter.png";
import whitesaveicon from "./images/whitesave.png";
import armoricon from "./images/chest-armor.png";
import weighticon from "./images/weight.png";
import reseticon from "./images/reset.png";
import cognitionicon from "./images/cognition.png";
import conditioningicon from "./images/weight-lifting-up.png";
import precisionicon from "./images/precision.png";
import proficiencyicon from "./images/proficiency.png";
import commandicon from "./images/command.png";
import horseicon from "./images/horse-head.png";
import horsehealthicon from "./images/horsehealth.png";
import horsearmoricon from "./images/horsearmor.png";
import horsespeedicon from "./images/horsespeed.png";
import horsemaneuvericon from "./images/horsemaneuver.png";
import horsechargeicon from "./images/horsecharge.png";
import military_amphi from "./images/military_amphi.png";
import armoury_banner from "./images/armoury_splash.png";
import amphitheatre_textlogo from "./images/amphitheatre_textlogo.png";
import tasicon from "./images/tas_icon.png";
import noape from "./images/nakedape.png";
import Loading from "./Loading.js";
import Connector from "./Connector.js";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import {
  Address, TransactionUnspentOutputs,
  TransactionOutput,
  Value,
  TransactionBuilder,
  TransactionBuilderConfigBuilder, LinearFee,
  BigNum,
  encode_json_str_to_metadatum,
  GeneralTransactionMetadata,
  AuxiliaryData, TransactionWitnessSet,
  Transaction
} from "@emurgo/cardano-serialization-lib-asmjs";
import changeTextColor from './colorTiers.js';
import { Buffer } from './App.js';

// Establish Loadout GearBox Structure
export function App() {
  const [dustbins_row1, setDustbins1] = useState([
    { accepts: [ItemTypes.HEAD], lastDroppedItem: null },
    { accepts: [ItemTypes.BODY], lastDroppedItem: null },
    { accepts: [ItemTypes.SHOULDERS], lastDroppedItem: null },
    { accepts: [ItemTypes.GLOVES], lastDroppedItem: null },
    { accepts: [ItemTypes.LEG], lastDroppedItem: null },
    { accepts: [ItemTypes.SPECIAL], lastDroppedItem: null },
  ]);
  const [dustbins_row2, setDustbins2] = useState([
    { accepts: [ItemTypes.ITEM0], lastDroppedItem: null },
    { accepts: [ItemTypes.ITEM1], lastDroppedItem: null },
    { accepts: [ItemTypes.ITEM2], lastDroppedItem: null },
    { accepts: [ItemTypes.ITEM3], lastDroppedItem: null },
    { accepts: [ItemTypes.HORSE], lastDroppedItem: null },
    { accepts: [ItemTypes.HORSEHARNESS], lastDroppedItem: null },
  ]);
  var truncate = function (fullStr, strLen, separator) {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || "...";

    var sepLen = separator.length, charsToShow = strLen - sepLen, frontChars = Math.ceil(charsToShow / 2), backChars = Math.floor(charsToShow / 2);

    return (
      fullStr.substr(0, frontChars) +
      separator +
      fullStr.substr(fullStr.length - backChars)
    );
  };
  const [isLoadoutCentered, setIsLoadoutCentered] = useState(true);
  const [centerLoadoutColumnWidth, setCenterLoadoutColumnWidth] = useState(8);
  const [leftLoadoutColumnWidth, setLeftLoadoutColumnWidth] = useState(2);
  const [rightLoadoutColumnWidth, setRightLoadoutColumnWidth] = useState(2);
  const [leftLoadoutBoxWidth, setLeftLoadoutBoxWidth] = useState("100%");
  const [rightLoadoutBoxWidth, setRightLoadoutBoxWidth] = useState("100%");
  const [leftInventoryBoxWidth, setLeftInventoryBoxWidth] = useState("0%");
  const [rightInventoryBoxWidth, setRightInventoryBoxWidth] = useState("0%");
  const [showLeftInventory, setShowLeftInventory] = useState(false);
  const [showRightInventory, setShowRightInventory] = useState(false);
  const [filteredSlot, setfilteredSlot] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(["", 0, ""]);
  const [inventoryTopPadding, setInventoryTopPadding] = useState("");
  const [inventoryBottomPadding, setInventoryBottomPadding] = useState("");
  const [horseStatDisplay, setHorseStatDisplay] = useState("none");
  const [classIcon, setClassIcon] = useState("");
  const [classTooltip, setClassTooltip] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [widePage, setWidePage] = useState(true);
  const [currentItem, setCurrentItem] = useState();
  const [comparisonItem, setComparisonItem] = useState();
  const [gearMaxValues, setGearMaxValues] = useState();
  const settingAudio = new Audio(wooduisound);
  const soundAudio = new Audio(audiouisound);
  const recenterAudio = new Audio(recenteruisound);
  const resetLoadoutAudio = new Audio(chainuisound);
  const resetSlotAudio = new Audio(singleresetsound);
  const armorAudio = new Audio(armoruisound);
  const armorEquipAudio = new Audio(armoruiequipsound);
  const weaponAudio = new Audio(weaponuisound);
  const weaponEquipAudio = new Audio(weaponuiequipsound);
  const horseAudio = new Audio(horseuisound);
  const pageAudio = new Audio(pageuisound);
  const eraserAudio = new Audio(eraseruisound);
  const saveLoadoutButtonAudio = new Audio(saveloadoutbuttonsound);
  const openLoadoutAudio = new Audio(openloadoutsound);




  function openUrlInNewTab(url) {
    window.open(url, '_blank');
  }

  function resetSkillpoints() {
    if (soundEnabled) {
      eraserAudio.volume = 0.5;
      eraserAudio.play();
    }
    setUserLoadoutValues({});
  }

  function saveLoadoutPrompt() {
    if (soundEnabled) {
      saveLoadoutButtonAudio.volume = 0.5;
      saveLoadoutButtonAudio.play();
    }
    setLgShow(true);
  }

  function renderItemStatBar(equippedItemValue, comparisonItemValue, maximumValue, comparisonMode) {

    let gradientString = "linear-gradient(to right, ";
    let primaryBar = "";

    if (!equippedItemValue && !comparisonItemValue) {

      primaryBar = "#ead5c233 100%)";
      gradientString = gradientString + primaryBar;
      // console.log(gradientString);
      return gradientString;

    } else if (!comparisonItemValue || !equippedItemValue) {
      let primaryBarColor = "#ead5c2";
      if (comparisonItemValue) {
        primaryBarColor = "#eec07a";
      }
      const itemValue = determineStatToDisplay(equippedItemValue, comparisonItemValue);
      const barDifference = maximumValue - itemValue;
      const itemTotalPercentage = (itemValue / maximumValue) * 100;
      const unusedBarPercentage = (barDifference / maximumValue) * 100;
      primaryBar = primaryBarColor + " " + itemTotalPercentage + "%, ";
      gradientString = gradientString + primaryBar + "#ead5c233 " + unusedBarPercentage + "%)";
      // console.log(gradientString);
      return gradientString;

    } else {

      const floatEquippedValue = parseFloat(equippedItemValue);
      const floatComparisonValue = parseFloat(comparisonItemValue);
      const maxItemValue = Math.max(floatEquippedValue, floatComparisonValue);
      const minItemValue = Math.min(floatEquippedValue, floatComparisonValue);
      const barDifference = maximumValue - maxItemValue;
      const itemTotalPercentage = (maxItemValue / maximumValue) * 100;
      const unusedBarPercentage = (barDifference / maximumValue) * 100;
      primaryBar = "#ead5c2ff " + itemTotalPercentage + "%, ";
      gradientString = gradientString + primaryBar + "#ead5c233 " + unusedBarPercentage + "%)";
      // console.log(gradientString);
      return gradientString;
    }

  }

  function determineStatToDisplay(equippedItemStat, comparisonItemStat) {

    if (equippedItemStat == null && comparisonItemStat == null) {
      return ''; // Return an empty string if both are null or undefined
    }

    if (comparisonItemStat != null) {
      return comparisonItemStat;
    } else {
      return equippedItemStat;
    }
  }

  function determineComparisonColor(equippedItem, comparisonItem, comparisonMode) {
    let color;

    if (equippedItem == null || comparisonItem == null) {
      return '#000000'; // Default color in case of null or undefined values
    }

    if (equippedItem < comparisonItem) {
      color = '#266323';
    } else {
      color = '#632623';
    }
    // If valueC is 1, inverse the output
    if (comparisonMode === 1) {
      color = (color === '#266323') ? '#632623' : '#266323';
    }

    return color;
  }

  function recenterDustbins() {
    setCenterLoadoutColumnWidth(8);
    setLeftLoadoutColumnWidth(2);
    setRightLoadoutColumnWidth(2);
    setLeftLoadoutBoxWidth("100%");
    setRightLoadoutBoxWidth("100%");
    setLeftInventoryBoxWidth("0%");
    setRightInventoryBoxWidth("0%");
    setShowLeftInventory(false);
    setShowRightInventory(false);
    setIsLoadoutCentered(true);
    if (soundEnabled) {
      recenterAudio.volume = 0.5;
      recenterAudio.play();
    }
  }

  function toggleSoundEnabled() {
    if (soundEnabled) {
      setSoundEnabled(false);
    } else {
      soundAudio.volume = 0.5;
      soundAudio.play();
      setSoundEnabled(true);
    }
  }

  window.addEventListener('resize', function () {
    isPageWidthOver1000px(); // Output: true or false
  });

  function toggleHorseStatDisplay() {

    if (horseStatDisplay == "none") {
      setHorseStatDisplay('flex');
      if (soundEnabled) {
        settingAudio.volume = 0.5;
        settingAudio.play();
      }

    } else {
      setHorseStatDisplay('none');
      if (soundEnabled) {
        settingAudio.volume = 0.5;
        settingAudio.play();
      }

    }
  }

  function setActiveApeTraits(activeClass) {
  }

  function setActiveApeClass(activeClass) {
    switch (activeClass) {
      case "Craftsmen":
        setClassIcon(craftsmanicon);
        setClassTooltip(classTooltips.craftsman);
        break;
      case "Artists":
        setClassIcon(artisticon);
        setClassTooltip(classTooltips.artist);
        break;
      case "Explorers":
        setClassIcon(explorericon);
        setClassTooltip(classTooltips.explorer);
        break;
      case "Merchants":
        setClassIcon(merchanticon);
        setClassTooltip(classTooltips.merchanticon);
        break;
      case "Military Officers":
        setClassIcon(moicon);
        setClassTooltip(classTooltips.mo);
        break;
      case "Royal Advisors":
        setClassIcon(raicon);
        setClassTooltip(classTooltips.ra);
        break;
      case "Nobles":
        setClassIcon(nobleicon);
        setClassTooltip(classTooltips.noble);
        break;
      default:
        setClassIcon("");
        setClassTooltip("");
        break;
    }
  }

  function handleComparisonItem(comparison) {
    setComparisonItem(comparison);
  }
  function handleLeftDustbinClick(index, slot) {
    const thisSlot = ['L', index, slot];
    setSelectedSlot(thisSlot);
    setComparisonItem("");
    setCurrentItem(getCurrentItem(thisSlot));
    if (slot == "Head") {
      setInventoryTopPadding('0%');
      setInventoryBottomPadding('1020%');
    }
    if (slot == "Body") {
      setInventoryTopPadding('92%');
      setInventoryBottomPadding('1020%');
    }
    if (slot == "Shoulders") {
      setInventoryTopPadding('184%');
      setInventoryBottomPadding('1020%');
    }
    if (slot == "Gloves") {
      setInventoryTopPadding('276%');
      setInventoryBottomPadding('1020%');
    }
    if (slot == "Leg") {
      setInventoryTopPadding('368%');
      setInventoryBottomPadding('1020%');
    }
    if (slot == "Special") {
      setInventoryTopPadding('460%');
      setInventoryBottomPadding('1020%');
    }
    setIsLoadoutCentered(false);
    setShowLeftInventory(true);
    setShowRightInventory(false);
    setfilteredSlot(slot);
    setLeftLoadoutColumnWidth(4);
    setRightLoadoutColumnWidth(2);
    setLeftLoadoutBoxWidth("47%");
    setRightLoadoutBoxWidth("100%");
    setLeftInventoryBoxWidth("47%");
    setRightInventoryBoxWidth("0%");
    setCenterLoadoutColumnWidth(6);
    setCurrentItem(getCurrentItem());
    if (soundEnabled) {
      armorAudio.volume = 0.3;
      armorAudio.play();
    }
  }

  function handleRightDustbinClick(index, slot) {
    const thisSlot = ["R", index, slot];
    setSelectedSlot(thisSlot);
    setComparisonItem("");
    setCurrentItem(getCurrentItem(thisSlot));
    if (slot == "Item0") {
      setInventoryTopPadding('0%');
      setInventoryBottomPadding('1020%');
      slot = "Item";
    }
    if (slot == "Item1") {
      setInventoryTopPadding('92%');
      setInventoryBottomPadding('1020%');
      slot = "Item";
    }
    if (slot == "Item2") {
      setInventoryTopPadding('184%');
      setInventoryBottomPadding('1020%');
      slot = "Item";
    }
    if (slot == "Item3") {
      setInventoryTopPadding('276%');
      setInventoryBottomPadding('1020%');
      slot = "Item";
    }
    if (slot == "Horse") {
      setInventoryTopPadding('368%');
      setInventoryBottomPadding('1020%');
      if (soundEnabled) {
        horseAudio.volume = 0.3;
        horseAudio.play();
      }
    }
    if (slot == "HorseHarness") {
      setInventoryTopPadding('460%');
      setInventoryBottomPadding('1020%');
      if (soundEnabled) {
        armorAudio.volume = 0.3;
        armorAudio.play();
      }
    }
    if (slot == "Item") {
      if (soundEnabled) {
        weaponAudio.volume = 0.3;
        weaponAudio.play();
      }
    }
    setIsLoadoutCentered(false);
    setShowLeftInventory(false);
    setShowRightInventory(true);
    setfilteredSlot(slot);
    setRightLoadoutColumnWidth(4);
    setLeftLoadoutColumnWidth(2);
    setLeftLoadoutBoxWidth("100%");
    setRightLoadoutBoxWidth("47%");
    setLeftInventoryBoxWidth("0%");
    setRightInventoryBoxWidth("47%");
    setCenterLoadoutColumnWidth(6);

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
  const [imageContent, setImageContent] = useState({});
  const [ownedApes, setOwnedApes] = useState({});
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
    Special: "",
    Item0: "",
    Item1: "",
    Item2: "",
    Item3: "",
    Horse: "",
    HorseHarness: "",
  });
  const [userLoadoutValues, setUserLoadoutValues] = useState({});
  const [searchList, setSearchList] = useState([]);
  function capitalizeFirstLetter(string) {
    if (typeof string === 'string' && string.length > 0) {
      // Check if the first character is a letter
      const firstChar = string.charAt(0);
      if (/[a-zA-Z]/.test(firstChar)) {
        return firstChar.toUpperCase() + string.slice(1);
      }
    }
    // Return the string as is if it doesn't meet the conditions
    return string;
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
  const [originalWalletGear, setOriginalWalletGear] = useState([]);
  const [transformedLoadout, setTransformedLoadout] = useState({});

  useEffect(() => {
    pollWallets();
    lookupFunction();
    if (!apeSelected && Object.keys(ownedApes).length != 0) {
      setUserLoadout((prevUserLoadout) => ({
        ...prevUserLoadout,
        Ape: "",
      }));
      setApeSelected(true);
    }
    if (isLoading && gotContent) {
      simulateNetworkRequest().then(() => {
        setIsConnected(true);
        setIsLoading(false);
        // calculateAdaToken(balance);
        ResetDustbins();
        apeUpdateInfo(0);
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
        setOwnedApes(filtered);
      }
      if (userLoadoutContentArray.length == 0) {
        setNoLoadout(true);
      } else {
        setNoLoadout(false);
        setOnChainLoadout(userLoadoutContentArray);
        setOriginalWalletGear(userLoadoutContentArray);
        setSearchList(userLoadoutContentArray);
        transformOnchainLoadout();
        setGotContent(true);
      }
      // setGotContent(true);
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
      setAdaToken(lovelace / 1000000);
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
  function handleLoadout() {
    if (soundEnabled) {
      openLoadoutAudio.volume = 0.5;
      openLoadoutAudio.play();
    }
    setLgShowLoad(true);
  }
  function getApeName(key) {
    return ownedApes[key].name;
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
      onChainLoadout.map(({ id, image }) => {
        transformedLoad[id] = image;
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
    setOwnedApes({});
    setBeenHere(false);
    setUserLoadout({
      Ape: "",
      Head: "",
      Body: "",
      Shoulders: "",
      Gloves: "",
      Leg: "",
      Special: "",
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
      lookup[onChainLoadout[i].id] = onChainLoadout[i];
    }
    setLookup(lookup);
  }

  function resetSingleDustbin(gearSlotArg) {
    if (gearSlotArg[0] == "L") {
      setDustbins1(
        update(dustbins_row1, {
          [gearSlotArg[1]]: {
            lastDroppedItem: {
              $set: "",
            },
          },
        })
      );
    } else {
      setDustbins2(
        update(dustbins_row2, {
          [gearSlotArg[1]]: {
            lastDroppedItem: {
              $set: "",
            },
          },
        })
      );
    }

    const currentLoadout = (userLoadout);
    const thisCurrentItem = currentLoadout[gearSlotArg[2][0]].id;
    if (thisCurrentItem) {
      lookup[thisCurrentItem].amount = lookup[thisCurrentItem].amount + 1;
    }
    currentLoadout[gearSlotArg[2][0]] = "";
    setUserLoadout(currentLoadout);

    const currentLoadoutValues = (userLoadoutValues);
    currentLoadoutValues[gearSlotArg[2][0]] = "";
    setUserLoadoutValues(currentLoadoutValues);

    if (soundEnabled) {
      resetSlotAudio.volume = 0.5;
      resetSlotAudio.play();
    }
  }

  function ResetDustbins() {
    isPageWidthOver1000px();
    for (const key in userLoadout) {
      const value = userLoadout[key].id;
      if (key != "Ape") {
        if (value) {
          lookup[value].amount = lookup[value].amount + 1;
        }
      }
    }

    setDustbins1([
      { accepts: [ItemTypes.HEAD], lastDroppedItem: null },
      { accepts: [ItemTypes.BODY], lastDroppedItem: null },
      { accepts: [ItemTypes.SHOULDERS], lastDroppedItem: null },
      { accepts: [ItemTypes.GLOVES], lastDroppedItem: null },
      { accepts: [ItemTypes.LEG], lastDroppedItem: null },
      { accepts: [ItemTypes.SPECIAL], lastDroppedItem: null },
    ]);
    setDustbins2([
      { accepts: [ItemTypes.ITEM0], lastDroppedItem: null },
      { accepts: [ItemTypes.ITEM1], lastDroppedItem: null },
      { accepts: [ItemTypes.ITEM2], lastDroppedItem: null },
      { accepts: [ItemTypes.ITEM3], lastDroppedItem: null },
      { accepts: [ItemTypes.HORSE], lastDroppedItem: null },
      { accepts: [ItemTypes.HORSEHARNESS], lastDroppedItem: null },
    ]);
    setUserLoadoutValues({});
    setUserLoadout((prevUserLoadout) => ({
      ...prevUserLoadout,
      Head: "",
      Body: "",
      Shoulders: "",
      Gloves: "",
      Leg: "",
      Special: "",
      Item0: "",
      Item1: "",
      Item2: "",
      Item3: "",
      Horse: "",
      HorseHarness: "",
    }));
    recenterDustbins();
    if (soundEnabled) {
      resetLoadoutAudio.volume = 0.5;
      resetLoadoutAudio.play();
    }
  }

  let loadoutValues = {};

  const [droppedLoadoutNames, setDroppedLoadoutNames] = useState([]);
  function isDropped(boxName) {
    return droppedLoadoutNames.indexOf(boxName) > -1;
  }
  function getCurrentItem(thisSelectedSlot) {
    const thisCurrentItem = userLoadout[thisSelectedSlot[2][0]];
    return thisCurrentItem;
  }

  //get loadouttotals function to calculate attribute and skill totals
  function getLoadoutTotals() {
    let points = 0;
    let armor = 0;
    let weight = 0;
    let cognition = 0;
    let conditioning = 0;
    let proficiency = 0;
    let precision = 0;
    let command = 0;
    let discipline = 0;
    let tactics = 0;
    let crafting = 0;
    let resilience = 0;
    let riding = 0;
    let speed = 0;
    let meleeskill = 0;
    let bow = 0;
    let throwing = 0;
    let crossbow = 0;
    let horsehealth = 0;
    let horsearmor = 0;
    let horsespeed = 0;
    let horsemaneuver = 0;
    let horsecharge = 0;
    let horseweight = 0;


    if (userLoadoutValues != {}) {
      Object.keys(userLoadoutValues).map((key, index) => {
        points += parseInt(userLoadoutValues[key]?.points || 0);
        armor += parseInt(userLoadoutValues[key]?.armor || 0);
        weight += parseInt(userLoadoutValues[key]?.weight || 0);
        command += parseInt(userLoadoutValues[key]?.command || 0);
        cognition += parseInt(userLoadoutValues[key]?.cognition || 0);
        conditioning += parseInt(userLoadoutValues[key]?.conditioning || 0);
        proficiency += parseInt(userLoadoutValues[key]?.proficiency || 0);
        precision += parseInt(userLoadoutValues[key]?.precision || 0);
        tactics += parseInt(userLoadoutValues[key]?.tactics || 0);
        crafting += parseInt(userLoadoutValues[key]?.crafting || 0);
        resilience += parseInt(userLoadoutValues[key]?.resilience || 0);
        riding += parseInt(userLoadoutValues[key]?.riding || 0);
        speed += parseInt(userLoadoutValues[key]?.cavalry || 0);
        meleeskill += parseInt(userLoadoutValues[key]?.meleeskill || 0);
        discipline += parseInt(userLoadoutValues[key]?.discipline || 0);
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
      command: command,
      discipline: discipline,
      tactics: tactics,
      crafting: crafting,
      resilience: resilience,
      riding: riding,
      speed: speed,
      meleeskill: meleeskill,
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

  function isPageWidthOver1000px() {
    setWidePage(window.innerWidth > 1000);
  }

  const handleDrop = useCallback(
    (index, item, accepts) => {
      const currentLoadout = (userLoadout);
      let slotName = lookup[item.name].slot;

      if (slotName == "Item") {
        slotName = lookup[item.name].slot + "" + index;
      }
      const thisPreviousItem = currentLoadout[slotName].id;

      if (thisPreviousItem) {
        lookup[thisPreviousItem].amount = lookup[thisPreviousItem].amount + 1;
      }

      setCurrentItem(lookup[item.name]);
      setComparisonItem("");

      setUserLoadout((prevUserLoadout) => ({
        ...prevUserLoadout,
        [accepts[0]]: lookup[item.name],
      }));
      setUserLoadoutValues((prevUserLoadout) => ({
        ...prevUserLoadout,
        [accepts[0]]: lookup[item.name],
      }));

      const { name } = item;

      setDroppedLoadoutNames(
        update(droppedLoadoutNames, name ? { $push: [name] } : { $push: [] })
      );

      switch (accepts[0]) {
        case 'Head':
        case 'Body':
        case 'Shoulders':
        case 'Gloves':
        case 'Leg':
        case 'Special':
          setDustbins1(
            update(dustbins_row1, {
              [index]: {
                lastDroppedItem: {
                  $set: item,
                },
              },
            })
          );
          break;

        default:
          setDustbins2(
            update(dustbins_row2, {
              [index]: {
                lastDroppedItem: {
                  $set: item,
                },
              },
            })
          );
          break;
      }

    },

    [droppedLoadoutNames, dustbins_row1, dustbins_row2]
  );

  function apeUpdateInfo(event) {
    //had to add an ape index after I added the noape pfp for non holders
    const apeIndex = event - 1;
    const apeKey = Object.keys(ownedApes)[apeIndex];
    const selectedApe = ownedApes[apeKey];

    if (selectedApe) {
      setApeSelected(true);
      setActiveApeClass(selectedApe.class);
      setUserLoadout((prevUserLoadout) => ({
        ...prevUserLoadout,
        Ape: selectedApe,
      }));
    } else {
      setActiveApeClass("None");
      setApeSelected(true);
      setUserLoadout((prevUserLoadout) => ({
        ...prevUserLoadout,
        Ape: "",
      }));
    }


    if (soundEnabled) {
      pageAudio.volume = 0.5;
      pageAudio.play();
    }
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

  return (
    <div className="homepage">
      <Container>
        <Row style={{ paddingTop: "20px" }}>
          <div className="nav_bar_top d-flex justify-content-between w-100" style={{ flexWrap: "nowrap" }}>
            <div className="d-flex justify-content-between">
              <div>
                {wallets ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      className="button_tas_1"
                      id="dropdown-basic"
                      style={{
                        fontFamily: "Cabin",
                        backgroundColor: "#ead5c2"
                      }}
                    >
                      Wallet: {capitalizeFirstLetter(whichWallet)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ background: 'linear-gradient(to bottom, #ffffff, #ead5c2)' }}>
                      {wallets.map((val) => {
                        // console.log();
                        return (
                          <Dropdown.Item
                            key={val}
                            onClick={(val) => {
                              handleWalletSelect(val);
                            }}
                            style={{ ':hover': { backgroundColor: '#eec07a' } }}
                          >
                            <img
                              src={window.cardano[val].icon}
                              width={24}
                              height={24} />
                            {val}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  ""
                )}
              </div>
              <div>
                {isConnected ? (
                  <Button onClick={handleEditWallet} className="button_tas_1">
                    Disconnect
                  </Button>
                ) : (
                  <Button type="button" disabled={!whichWallet} id="button-addon1" className="button_tas_2" onClick={onSubmitAddy}>
                    Connect
                  </Button>
                )}
              </div>
            </div>

            {isConnected ? (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ color: "#ead5c2", textAlign: "center" }}>
                  <img src={society} style={{ width: "35px" }} />
                  {" "}{societyToken} |  {truncate(walletAddress, 11)}{" "}
                  <img src={amphilogo} style={{ width: "35px" }} />
                </div>
              </div>
            ) : (
              ""
            )}
            {isConnected && widePage ? (
              <div>
                <img src={amphitheatre_textlogo} style={{ maxWidth: "300px", width: "100%" }} />
              </div>
            ) : (
              ""
            )}
          </div>
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
              <div style={{ display: "flex", justifyContent: "center", paddingBottom: "15px" }}>
                <img src={military_amphi} style={{ width: "50px" }} />
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
                  <div style={{ display: "flex", justifyContent: "center", paddingBottom: "15px" }}>
                    <img src={military_amphi} style={{ width: "50px" }} />
                  </div>
                  <div className="modal-title" style={{ fontFamily: "Cabin, sans-serif" }}>
                    <h2> Confirm your selection </h2>
                  </div>
                  {Object.keys(userLoadout).map((key, index) => {
                    let thisLoadoutObject = userLoadout[key];
                    if (key == "Ape") {
                      if (thisLoadoutObject) {
                        return (
                          <p key={index} style={{ fontSize: "22px", fontWeight: "500" }}>
                            <img src={tasicon} style={{ width: "30px", marginRight: "5px" }} />
                            {thisLoadoutObject.name}
                            <img src={tasicon} style={{ width: "30px", marginLeft: "5px" }} />
                          </p>
                        );
                      }
                    } else {
                      if (thisLoadoutObject) {
                        return (
                          <p key={index} style={{ fontSize: "15px", fontWeight: "500", }}>
                            {thisLoadoutObject.slot}:  <div style={{ color: changeTextColor(thisLoadoutObject.tier) }}>{thisLoadoutObject.name}</div>
                          </p>
                        );
                      };
                    }
                  })}{" "}

                  {/*
                    <div className="characterstats">
                      {//need to include something that warns the user when they haven't use their attribute points
                      }
                      <p> <img src={armoricon} style={{ width: "20px" }} />Armor: {getLoadoutTotals()["armor"]} </p>{" "}
                      <p> <img src={weighticon} style={{ width: "20px" }} /> {getLoadoutTotals()["weight"]} </p>{" "}
                      <p> <img src={disciplineicon} style={{ width: "20px" }} /> {getLoadoutTotals()["discipline"]} </p>{" "}
                      <p> <img src={tacticsicon} style={{ width: "20px" }} /> {getLoadoutTotals()["tactics"]} </p>{" "}
                      <p> <img src={craftingicon} style={{ width: "20px" }} /> {getLoadoutTotals()["crafting"]} </p>{" "}
                      <p> <img src={resilienceicon} style={{ width: "20px" }} /> {getLoadoutTotals()["resilience"]} </p>{" "}
                      <p> <img src={speedicon} style={{ width: "20px" }} /> {getLoadoutTotals()["speed"]} </p>{" "}
                      <p> <img src={ridingicon} style={{ width: "20px" }} /> {getLoadoutTotals()["riding"]} </p>{" "}
                      <p> <img src={meleeicon} style={{ width: "20px" }} /> {getLoadoutTotals()["meleeskill"]} </p>{" "}
                      <p> <img src={bowicon} style={{ width: "20px" }} /> {getLoadoutTotals()["bow"]} </p>{" "}
                      <p> <img src={throwingicon} style={{ width: "20px" }} /> {getLoadoutTotals()["throwing"]} </p>{" "}
                      <p> <img src={crossbowicon} style={{ width: "20px" }} /> {getLoadoutTotals()["crossbow"]} </p>{" "}
                      <p> <img src={horsehealthicon} style={{ width: "20px" }} /> {getLoadoutTotals()["horsehealth"]} </p>{" "}
                      <p> <img src={horsearmoricon} style={{ width: "20px" }} /> {getLoadoutTotals()["horsearmor"]} </p>{" "}
                      <p> <img src={horsespeedicon} style={{ width: "20px" }} /> {getLoadoutTotals()["horsespeed"]} </p>{" "}
                      <p> <img src={horsemaneuvericon} style={{ width: "20px" }} /> {getLoadoutTotals()["horsemaneuver"]} </p>{" "}
                      <p> <img src={horsechargeicon} style={{ width: "20px" }} /> {getLoadoutTotals()["horsecharge"]} </p>{" "}
                      <p> <img src={weighticon} style={{ width: "20px" }} /> {getLoadoutTotals()["horseweight"]} </p>{" "}
                    </div>
                    */}
                  <div className="modal-button ">
                    <Button className="button_tas_1" style={{ marginRight: "10px" }} onClick={() => setLgShow(false)}>
                      Cancel
                    </Button>
                    <Button variant="success" className="button_tas_2" onClick={() => buildSendADATransaction()}>
                      Confirm
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        ) : ""}
        {isConnected ? (
          <Row>
            <div className="nav_bar_top d-flex justify-content-between w-100" style={{ flexWrap: "nowrap" }}>
              <div className="readyButton text-center">
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Open Loadouts</Tooltip>}>
                  <Button variant="light" onClick={handleLoadout} className="button_tas_toolbar_1">
                    <img src={switchicon} style={{ width: "25px" }} />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Reset Loadout</Tooltip>}>
                  <Button variant="light" onClick={ResetDustbins} className="button_tas_toolbar_1">
                    <img src={reseticon} style={{ width: "25px" }} />
                  </Button>
                </OverlayTrigger>
              </div>
              <div className="readyButton text-center">
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Re-Center</Tooltip>}>
                  <Button variant="light" className={`button_tas_toolbar_1 ${isLoadoutCentered && "button_tas_toolbar_2"}`} onClick={recenterDustbins}>
                    <img src={recentericon} className={`toolbaricon1 ${isLoadoutCentered && "toolbaricon2"}`} />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Toggle Horse Stats</Tooltip>}>
                  <Button variant="light" className={`button_tas_toolbar_1 ${horseStatDisplay !== "none" && "button_tas_toolbar_2"}`} onClick={toggleHorseStatDisplay}>
                    <img className={`toolbaricon1 ${horseStatDisplay !== "none" && "toolbaricon2"}`} src={horseicon} />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Toggle Audio</Tooltip>}>
                  <Button variant="light" className={`button_tas_toolbar_1 ${soundEnabled && "button_tas_toolbar_2"}`} onClick={toggleSoundEnabled}>
                    <img className={`toolbaricon1 ${soundEnabled && "toolbaricon2"}`} src={soundicon} />
                  </Button>
                </OverlayTrigger>
              </div>
              {!noLoadout ? (
                <div className="readyButton text-center">
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Save Loadout</Tooltip>}>
                    <Button disabled={!isConnected} variant="success" className="button_tas_2" onClick={saveLoadoutPrompt}>
                      <img src={whitesaveicon} style={{ width: "25px" }} />
                    </Button>
                  </OverlayTrigger>
                </div>
              ) : (
                ""
              )}
            </div>
            <Row className="d-flex">
              <div className="skills_bar_line">
              </div>
            </Row>
          </Row>

        ) : (
          ""
        )}
        {isConnected ? (
          <Row className="d-flex justify-content-center">
            <Col xs={(leftLoadoutColumnWidth)} className="d-flex justify-content-end">
              <Col xs={6} className="d-flex flex-column justify-content-start align-items-start" style={{ width: leftInventoryBoxWidth }}>
                {showLeftInventory && (
                  <div className="inventory" style={{ "marginTop": "3%", "paddingTop": `${inventoryTopPadding}`, "marginBottom": `-${inventoryBottomPadding}`, width: "95%" }}>
                    {searchList
                      .filter(item => item.slot == filteredSlot)
                      .map(
                        (
                          {
                            id, name, slot, amount, armor, image, weight, tier
                          },
                          index
                        ) => (
                          <Row style={{ justifyContent: "center", display: "grid" }}>
                            <Col>
                              <Box
                                key={index}
                                name={id}
                                type={slot}
                                img={image}
                                tier={tier}
                                armor={armor}
                                amount={lookup[id].amount}
                                isDropped={isDropped(id)}
                                onClick={() => setComparisonItem(lookup[id])} />
                            </Col>
                          </Row>
                        )
                      )}
                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                      <img src={reseticon} className="gear_img_2" onClick={() => resetSingleDustbin(selectedSlot)} />
                    </div>
                  </div>
                )}
              </Col>
              <Col xs={6} className="d-flex justify-content-end align-items-start" style={{ width: leftLoadoutBoxWidth }}>
                <div className="d-flex flex-column justify-content-end align-items-start" style={{ width: "95%" }}>
                  {dustbins_row1.map(({ accepts, lastDroppedItem }, index) => (
                    <Dustbin
                      accept={accepts}
                      lastDroppedItem={lastDroppedItem}


                      onDrop={(item) => {
                        if (soundEnabled) {
                          armorEquipAudio.volume = 0.3;
                          armorEquipAudio.play();
                        }

                        handleDrop(index, item, accepts);
                        lookup[item.name].amount = lookup[item.name].amount - 1;
                      }}
                      onClick={() => handleLeftDustbinClick(index, accepts)}
                      key={index}
                      img={lastDroppedItem ? transformedLoadout[lastDroppedItem["name"]] : ""} />
                  ))}
                </div>
              </Col>
            </Col>
            <Col xs={(centerLoadoutColumnWidth)} className="text-center">
              <Row style={{ padding: "5px" }}>
                <div className="big_box">
                  <div className="skills_bar_top_left">
                    <div className="skills_group">
                      <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Player Attributes</Tooltip>}>
                        <img className='skill_img_header' src={amphilogo} />
                      </OverlayTrigger>
                      <p>
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Command - Parent attribute over Inspiration, Sustenance, and Arsenal skills.</Tooltip>}>
                          <img src={commandicon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["command"]}
                      </p>
                      <p>
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Cognition - Parent attribute over Crafting, Tactics, and Medic skills.</Tooltip>}>
                          <img src={cognitionicon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["cognition"]}
                      </p>
                      <p>
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Conditioning - Parent attribute over Athletics, Resilience, and Riding skills.</Tooltip>}>
                          <img src={conditioningicon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["conditioning"]}
                      </p>
                      <p>
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Proficiency - Parent attribute over Melee, Defense, and Discipline skills.</Tooltip>}>
                          <img src={proficiencyicon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["proficiency"]}
                      </p>
                      <p>
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Precision - Parent attribute over Bow, Crossbow, and Throwing skills.</Tooltip>}>
                          <img src={precisionicon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["precision"]}
                      </p>
                      <p>
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Armour - Cut & Pierce Damage Resistance.</Tooltip>}>
                          <img src={armoricon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["armor"]}
                      </p>
                      <p>
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip">Encumbrance - Negatively affects movement speed.</Tooltip>}>
                          <img src={weighticon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["weight"]}
                      </p>
                    </div>
                  </div>
                  <div className="skills_bar_bottom_left">
                    <div className="skills_group" style={{ display: horseStatDisplay }}>
                      <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip">Mount Attributes</Tooltip>}>
                        <img className='skill_img_header' src={horseicon} />
                      </OverlayTrigger>
                      <p>
                        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip">Health</Tooltip>}>
                          <img src={horsehealthicon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["horsehealth"]}
                      </p>
                      <p>
                        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip">Top Speed</Tooltip>}>
                          <img src={horsespeedicon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["horsespeed"]}
                      </p>
                      <p>
                        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip">Maneuverability</Tooltip>}>
                          <img src={horsemaneuvericon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["horsemaneuver"]}
                      </p>
                      <p>
                        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip">Charge Damage</Tooltip>}>
                          <img src={horsechargeicon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["horsecharge"]}
                      </p>
                      <p>
                        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip">Armour</Tooltip>}>
                          <img src={horsearmoricon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["horsearmor"]}
                      </p>
                      <p>
                        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip">Encumbrance</Tooltip>}>
                          <img src={weighticon} />
                        </OverlayTrigger>
                        {getLoadoutTotals()["horseweight"]}
                      </p>
                    </div>
                  </div>
                  <div className="skills_bar_top_right">
                    <div className="skills_group_horizontal">
                      <p>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">{classTooltip}</Tooltip>}>
                          <img src={classIcon} />
                        </OverlayTrigger>
                      </p>
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">{generalTooltips.tas}</Tooltip>}>
                        <img className='skill_img_header' src={tasicon} />
                      </OverlayTrigger>
                    </div>
                  </div>
                  <Carousel id="apeCarousel" infiniteLoop={true} selectedItem={0} onChange={apeUpdateInfo} onClickItem={apeUpdateInfo}>
                    <img src={noape} key={(0)} style={{ width: '100%' }} />
                    {ownedApes
                      ? Object.keys(ownedApes) &&
                      Object.keys(ownedApes).map((val, index) => {
                        return <img src={ownedApes[val].image} key={ownedApes[index]} style={{ width: "100%" }} />;
                      })
                      : <img src={noape} key={(0)} style={{ width: '100%' }} />}
                  </Carousel>
                </div>
              </Row>
              <Row style={{ padding: "5px" }}>
              </Row>
              {!isLoadoutCentered && (
                // <div className="big_box" style={{width: "100%", paddingTop: "1%"}}>
                <Row className="d-flex flex-row" style={{ padding: "10px" }}>
                  {(determineStatToDisplay(currentItem.slot, comparisonItem.slot) == "Item") ? (
                    <><Col xs={2} className="d-flex flex-column justify-content-end align-items-end">
                      <p style={{ fontSize: 15 }}>-</p>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Length")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Damage")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Hitpoints")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Weight")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Accuracy")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Ammo")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Utility")}
                      </div>
                    </Col>
                      <Col xs={8} className="d-flex flex-column justify-content-end align-items-start">
                        <p style={{ fontSize: 15, color: changeTextColor(determineStatToDisplay(currentItem.tier, comparisonItem.tier)) }}>
                          {determineStatToDisplay(currentItem.name, comparisonItem.name)}
                        </p>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: '100%', height: '80%', background: renderItemStatBar(currentItem.length, comparisonItem.length, 200, 0), }}>
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: '100%', height: '80%', backgroundColor: '#ead5c2', }}>
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: '100%', height: '80%', backgroundColor: '#ead5c2', }}>
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: '100%', height: '80%', backgroundColor: '#ead5c2', }}>
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: '100%', height: '80%', backgroundColor: '#ead5c2', }}>
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: '100%', height: '80%', backgroundColor: '#ead5c2', }}>
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: '100%', height: '80%', backgroundColor: '#ead5c2', }}>

                        </div>
                      </Col>
                      <Col xs={2} className="d-flex flex-column justify-content-end align-items-start">
                        <p style={{ fontSize: 15 }}>-</p>
                        <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                          {determineStatToDisplay(currentItem.length, comparisonItem.length)}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                          {determineStatToDisplay(currentItem.damage, comparisonItem.damage)}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                          {determineStatToDisplay(currentItem.hitpoints, comparisonItem.hitpoints)}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                          {determineStatToDisplay(currentItem.weight, comparisonItem.weight)}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                          {determineStatToDisplay(currentItem.accuracy, comparisonItem.accuracy)}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                          {determineStatToDisplay(currentItem.ammo, comparisonItem.ammo)}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                          {determineStatToDisplay(currentItem.utility, comparisonItem.utility)}
                        </div>
                      </Col>
                    </>
                  ) : (
                    <><Col xs={2} className="d-flex flex-column justify-content-end align-items-end">
                      <p style={{ fontSize: 15 }}>-</p>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Armor")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Command")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Cognition")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Conditioning")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Proficiency")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Precision")}
                      </div>
                      <div style={{ marginTop: '5px', marginBottom: '5px', height: '80%', color: '#ead5c2' }}>
                        {capitalizeFirstLetter("Weight")}
                      </div>
                    </Col><Col xs={8} className="d-flex flex-column justify-content-end align-items-start">
                        <p style={{ fontSize: 15, color: changeTextColor(currentItem.tier) }}>
                          {currentItem.name}
                        </p>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: `${(currentItem.armor / 20) * 100}%`, height: '80%', backgroundColor: '#ead5c2', }}>
                          {currentItem.armor}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: `${(currentItem.command / 5) * 100}%`, height: '80%', backgroundColor: '#ead5c2', }}>
                          {currentItem.command}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: `${(currentItem.cognition / 5) * 100}%`, height: '80%', backgroundColor: '#ead5c2', }}>
                          {currentItem.cognition}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: `${(currentItem.conditioning / 5) * 100}%`, height: '80%', backgroundColor: '#ead5c2', }}>
                          {currentItem.conditioning}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: `${(currentItem.proficiency / 5) * 100}%`, height: '80%', backgroundColor: '#ead5c2', }}>
                          {currentItem.proficiency}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: `${(currentItem.precision / 5) * 100}%`, height: '80%', backgroundColor: '#ead5c2', }}>
                          {currentItem.precision}
                        </div>
                        <div style={{ marginTop: '5px', marginBottom: '5px', width: `${(currentItem.weight / 15) * 100}%`, height: '80%', backgroundColor: '#ead5c2', }}>
                          {currentItem.weight}
                        </div>
                      </Col></>
                  )}
                </Row>
                // </div>
              )}
            </Col>
            <Col xs={(rightLoadoutColumnWidth)} className="d-flex justify-content-start">
              <Col xs={6} className="d-flex justify-content-start align-items-start" style={{ width: rightLoadoutBoxWidth }}>
                <div className="d-flex flex-column justify-content-start" style={{ width: "95%" }}>
                  {dustbins_row2.map(({ accepts, lastDroppedItem }, index) => (
                    <Dustbin
                      accept={accepts[0] === "Item0" ||
                        accepts[0] === "Item1" ||
                        accepts[0] === "Item2" ||
                        accepts[0] === "Item3"
                        ? acceptsItem
                        : accepts}
                      lastDroppedItem={lastDroppedItem}
                      onClick={() => handleRightDustbinClick(index, accepts)}
                      onDrop={(item) => {
                        if (accepts === "Item0" ||
                          accepts === "Item1" ||
                          accepts === "Item2" ||
                          accepts === "Item3") {
                          accepts = "Item";

                        }
                        if (soundEnabled) {
                          weaponEquipAudio.volume = 0.1;
                          weaponEquipAudio.play();
                        }
                        handleDrop(index, item, accepts);
                        lookup[item.name].amount = lookup[item.name].amount - 1;
                      }}
                      key={index}
                      img={lastDroppedItem ? transformedLoadout[lastDroppedItem["name"]] : ""} />
                  ))}
                </div>
              </Col>
              <Col xs={6} className="d-flex justify-content-end align-items-start" style={{ width: rightInventoryBoxWidth }}>
                {showRightInventory && (
                  <div className="inventory" style={{ "marginTop": "3%", "paddingTop": `${inventoryTopPadding}`, "marginBottom": `-${inventoryBottomPadding}`, width: "95%" }}>

                    {searchList
                      .filter(item => item.slot == filteredSlot)
                      .map(
                        (
                          {
                            id, name, slot, amount, image, weight, armor, tier
                          },
                          index
                        ) => (
                          <Row style={{ justifyContent: "center", display: "grid" }}>
                            <Col>
                              <Box
                                key={index}
                                amount={amount}
                                name={id}
                                type={slot}
                                tier={tier}
                                img={image}
                                isDropped={isDropped(id)}
                                onClick={() => setComparisonItem(lookup[id])} />
                            </Col>
                          </Row>
                        )
                      )}
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img src={reseticon} className="gear_img_2" onClick={() => resetSingleDustbin(selectedSlot)} />
                    </div>
                  </div>
                )}
              </Col>
            </Col>
          </Row>
        ) : (
          ""
        )}
        {!isConnected && !isLoading ? (
          /* this might where we want to integrate steam and xbox and epic */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "75vh" }}>
            <img src={armoury_banner} alt="Armoury banner" width="100%" style={{ maxWidth: "600px" }} />
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
            ownedApes={onWalletContent}
            whichWalletSet={whichWallet}
            isError={handleIsError}
            userLoadoutContentArray={onWalletContent}
            getTransactions={getTransactionsPosted} />
          {!refreshToken ? <Loading /> : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
