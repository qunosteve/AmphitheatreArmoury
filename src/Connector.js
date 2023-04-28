import React from "react";
import {
    Tab,
    Tabs,
    RadioGroup,
    Radio,
    FormGroup,
    InputGroup,
    NumericInput,
} from "@blueprintjs/core";
import Button from "react-bootstrap/Button";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/normalize.css/normalize.css";
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
import "./App.css";
import { blake2b } from "blakejs";

let Buffer = require("buffer/").Buffer;
let blake = require("blakejs");

export default class Connector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTabId: "1",
            whichWalletSelected: undefined,
            walletFound: false,
            walletIsEnabled: false,
            walletName: undefined,
            walletIcon: undefined,
            walletAPIVersion: undefined,
            wallets: [],
            walletContent: undefined,
            imageContent: undefined,
            filtered: undefined,
            filterSuccess: false,
            userLoadoutContent: undefined,
            userLoadoutContentArray: [],
            userLoadoutMetadata: undefined,
            contentQunatity: undefined,
            isEntered: false,
            postedTransactions: [],

            networkId: undefined,
            Utxos: undefined,
            CollatUtxos: undefined,
            balance: undefined,
            changeAddress: undefined,
            rewardAddress: undefined,
            usedAddress: undefined,

            txBody: undefined,
            txBodyCborHex_unsigned: "",
            txBodyCborHex_signed: "",
            submittedTxHash: "",

            addressBech32SendADA:
                "addr_test1qrt7j04dtk4hfjq036r2nfewt59q8zpa69ax88utyr6es2ar72l7vd6evxct69wcje5cs25ze4qeshejy828h30zkydsu4yrmm",
            lovelaceToSend: 1000000,
            assetNameHex: "4c494645",
            assetPolicyIdHex:
                "ae02017105527c6c0c9840397a39cc5ca39fabe5b9998ba70fda5f2f",
            assetAmountToSend: 5,
            addressScriptBech32:
                "addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8",
            datumStr: "12345678",
            plutusScriptCborHex: "4e4d01000033222220051200120011",
            transactionIdLocked: "",
            transactionIndxLocked: 0,
            lovelaceLocked: 3000000,
            manualFee: 900000,
        };

        /**
         * When the wallet is connect it returns the connector which is
         * written to this API variable and all the other operations
         * run using this API object
         */
        this.API = undefined;

        /**
         * Protocol parameters
         * @type {{
         * keyDeposit: string,
         * coinsPerUtxoWord: string,
         * minUtxo: string,
         * poolDeposit: string,
         * maxTxSize: number,
         * priceMem: number,
         * maxValSize: number,
         * linearFee: {minFeeB: string, minFeeA: string}, priceStep: number
         * }}
         */
        this.protocolParams = {
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

        this.pollWallets = this.pollWallets.bind(this);
    }

    /**
     * Poll the wallets it can read from the browser.
     * Sometimes the html document loads before the browser initialized browser plugins (like Nami or Flint).
     * So we try to poll the wallets 3 times (with 1 second in between each try).
     *
     * Note: CCVault and Eternl are the same wallet, Eternl is a rebrand of CCVault
     * So both of these wallets as the Eternl injects itself twice to maintain
     * backward compatibility
     *
     * @param count The current try count.
     */
    pollWallets = (count = 0) => {
        const wallets = [];
        for (const key in window.cardano) {
            if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
                wallets.push(key);
            }
        }
        if (wallets.length === 0 && count < 3) {
            setTimeout(() => {
                this.pollWallets(count + 1);
            }, 1000);
            return;
        }
        // console.log(this.props.whichWalletSet);

        this.setState(
            {
                wallets,
                whichWalletSelected: this.props.whichWalletSet,
            },
            () => {
                //console.log(this.state.wallets);
                this.refreshData();
            }
        );
    };

    onGetWalletSelection = () => {
        this.state.whichWalletSelected(this.props.walletSelection);
    };

    /**
     * Handles the tab selection on the user form
     * @param tabId
     */
    handleTabId = (tabId) => this.setState({ selectedTabId: tabId });

    /**
     * Handles the radio buttons on the form that
     * let the user choose which wallet to work with
     * @param obj
     */
    /* handleWalletSelect = (obj) => {
        const whichWalletSelected = obj.target.value;
        this.setState({ whichWalletSelected }, () => {
            this.refreshData();
        });
    };*/

    /**
     * Generate address from the plutus contract cborhex
     */
    generateScriptAddress = () => {
        // cborhex of the alwayssucceeds.plutus
        // const cborhex = "4e4d01000033222220051200120011";
        // const cbor = Buffer.from(cborhex, "hex");
        // const blake2bhash = blake.blake2b(cbor, 0, 28);

        const script = PlutusScript.from_bytes(
            Buffer.from(this.state.plutusScriptCborHex, "hex")
        );
        // const blake2bhash = blake.blake2b(script.to_bytes(), 0, 28);
        const blake2bhash =
            "67f33146617a5e61936081db3b2117cbf59bd2123748f58ac9678656";
        const scripthash = ScriptHash.from_bytes(
            Buffer.from(blake2bhash, "hex")
        );

        const cred = StakeCredential.from_scripthash(scripthash);
        const networkId = NetworkInfo.testnet().network_id();
        const baseAddr = EnterpriseAddress.new(networkId, cred);
        const addr = baseAddr.to_address();
        const addrBech32 = addr.to_bech32();

        // hash of the address generated from script
        //console.log(Buffer.from(addr.to_bytes(), "utf8").toString("hex"));

        // hash of the address generated using cardano-cli
        const ScriptAddress = Address.from_bech32(
            "addr_test1wpnlxv2xv9a9ucvnvzqakwepzl9ltx7jzgm53av2e9ncv4sysemm8"
        );
        //  console.log(
        //       Buffer.from(ScriptAddress.to_bytes(), "utf8").toString("hex")
        //   );

        //  console.log(ScriptAddress.to_bech32());
        //  console.log(addrBech32);
    };

    /**
     * Checks if the wallet is running in the browser
     * Does this for Nami, Eternl and Flint wallets
     * @returns {boolean}
     */

    checkIfWalletFound = () => {
        const walletKey = this.state.whichWalletSelected;
        const walletFound = !!window?.cardano?.[walletKey];
        this.setState({ walletFound });
        return walletFound;
    };

    /**
     * Checks if a connection has been established with
     * the wallet
     * @returns {Promise<boolean>}
     */
    checkIfWalletEnabled = async () => {
        let walletIsEnabled = false;

        try {
            const walletName = this.state.whichWalletSelected;
            walletIsEnabled = await window.cardano[walletName].isEnabled();
        } catch (err) {
            console.log(err);
            this.props.isError(err);
        }
        this.setState({ walletIsEnabled });

        return walletIsEnabled;
    };

    /**
     * Enables the wallet that was chosen by the user
     * When this executes the user should get a window pop-up
     * from the wallet asking to approve the connection
     * of this app to the wallet
     * @returns {Promise<boolean>}
     */

    enableWallet = async () => {
        const walletKey = this.state.whichWalletSelected;
        try {
            this.API = await window.cardano[walletKey].enable();
        } catch (err) {
            console.log(err);
            this.props.isError(err);
        }
        return this.checkIfWalletEnabled();
    };

    /**
     * Get the API version used by the wallets
     * writes the value to state
     * @returns {*}
     */
    getAPIVersion = () => {
        const walletKey = this.state.whichWalletSelected;
        const walletAPIVersion = window?.cardano?.[walletKey].apiVersion;
        this.setState({ walletAPIVersion });
        return walletAPIVersion;
    };

    /**
     * Get the name of the wallet (nami, eternl, flint)
     * and store the name in the state
     * @returns {*}
     */

    getWalletName = () => {
        const walletKey = this.state.whichWalletSelected;
        const walletName = window?.cardano?.[walletKey].name;
        this.setState({ walletName });
        return walletName;
    };

    /**
     * Gets the Network ID to which the wallet is connected
     * 0 = testnet
     * 1 = mainnet
     * Then writes either 0 or 1 to state
     * @returns {Promise<void>}
     */
    getNetworkId = async () => {
        try {
            const networkId = await this.API.getNetworkId();
            this.setState({ networkId });
        } catch (err) {
            console.log(err);
            this.props.isError(err);
        }
    };

    /**
     * Gets the UTXOs from the user's wallet and then
     * stores in an object in the state
     * @returns {Promise<void>}
     */

    getUtxos = async () => {
        let Utxos = [];
        let walletContent = {};
        let imageContent = {};
        let userLoadoutContent = {};
        let contentQunatity = {};
        let societyCounter = 0;
        let prevContentQuantity = {};
        let prevAmount = 0;
        let txID = [];

        try {
            const rawUtxos = await this.API.getUtxos();

            for (const rawUtxo of rawUtxos) {
                const utxo = TransactionUnspentOutput.from_bytes(
                    Buffer.from(rawUtxo, "hex")
                );
                const input = utxo.input();
                const txid = Buffer.from(
                    input.transaction_id().to_bytes(),
                    "utf8"
                ).toString("hex");
                const txindx = input.index();
                const output = utxo.output();
                const amount = output.amount().coin().to_str(); // ADA amount in lovelace
                if (amount === "1001001") {
                    if (!txID.find((tx) => tx === txid)) {
                        txID.push(txid);
                    }
                }
                const multiasset = output.amount().multiasset();
                //console.log(multiasset);
                let multiAssetStr = "";

                if (multiasset) {
                    const keys = multiasset.keys(); // policy Ids of thee multiasset
                    const N = keys.len();
                    // console.log(`${N} Multiassets in the UTXO`)

                    for (let i = 0; i < N; i++) {
                        const policyId = keys.get(i);
                        const policyIdHex = Buffer.from(
                            policyId.to_bytes(),
                            "utf8"
                        ).toString("hex");

                        //console.log(`policyId: ${policyIdHex}`);
                        const assets = multiasset.get(policyId);

                        const assetNames = assets.keys();
                        const K = assetNames.len();

                        // console.log(`${K} Assets in the Multiasset`)

                        for (let j = 0; j < K; j++) {
                            let amount = 0;
                            const assetName = assetNames.get(j);
                            const assetNameString = Buffer.from(
                                assetName.name(),
                                "utf8"
                            ).toString();

                            //console.log(assetName);
                            const assetNameHex = Buffer.from(
                                assetName.name(),
                                "utf8"
                            ).toString("hex");
                            const multiassetAmt = multiasset.get_asset(
                                policyId,
                                assetName
                            );
                            multiAssetStr += `+ ${multiassetAmt.to_str()} + ${policyIdHex}.${assetNameHex} (${assetNameString})`;
                            if (assetNameString === "SOCIETY") {
                                // console.log(multiassetAmt);
                                societyCounter =
                                    societyCounter +
                                    parseInt(multiassetAmt.to_str());
                            }

                            walletContent[assetNameString] =
                                assetNameString === "SOCIETY"
                                    ? societyCounter
                                    : multiassetAmt.to_str();

                            imageContent[`${assetNameString}`] = `${
                                policyIdHex.toString() + assetNameHex
                            }`;
                            if (
                                policyIdHex ===
                                "eadf13a24880c3b601c3332fb7b1b227bd50bd2dc3245ae15e278bb7"
                            ) {
                                userLoadoutContent[`${assetNameString}`] = `${
                                    policyIdHex.toString() + assetNameHex
                                }`;

                                if (contentQunatity[assetNameString]) {
                                    amount = contentQunatity[assetNameString];
                                }

                                contentQunatity[assetNameString] =
                                    parseInt(multiassetAmt.to_str()) + amount;
                            }

                            // walletContent.push({
                            //     name: `{${assetNameString}}`,
                            //     Quantity: `${multiassetAmt.to_str()}`,
                            // });
                            // console.log(assetNameString)
                            // console.log(`Asset Name: ${assetNameHex}`)
                        }
                    }
                }

                const obj = {
                    txid: txid,
                    txindx: txindx,
                    amount: amount,
                    str: `${txid} #${txindx} = ${amount}`,
                    multiAssetStr: multiAssetStr,
                    TransactionUnspentOutput: utxo,
                };
                Utxos.push(obj);
            }

            this.setState({ Utxos });
            this.setState({ walletContent });
            this.setState({ imageContent }, () => {
                this.setFilteredFunction();
            });
            this.setState({ userLoadoutContent }, () => {
                this.setOnChainLoadout();
            });
            this.setState({ contentQunatity });
            this.setState({ postedTransactions: txID }, () => {
                console.log(`from Connect ${this.state.postedTransactions}`);
            });
        } catch (err) {
            console.log(err);
            this.props.isError(err);
        }
    };

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    getUserLoadoutContent = async () => {
        if (this.state.userLoadoutContent.length != 0) {
            let userLoadout = [];

            try {
                for (var key in this.state.userLoadoutContent) {
                    const requestString = `https://cardano-mainnet.blockfrost.io/api/v0/assets/${this.state.userLoadoutContent[key]}`;
                    const response = await fetch(requestString, {
                        headers: {
                            project_id:
                                "mainnetbUyZDnp0NCCAkitKJk6jeiu28axzzpzG",
                        },
                    });

                    const data = await response.json();

                    userLoadout.push({
                        name: data.onchain_metadata.name,
                        tier: data.onchain_metadata.tier,
                        slot: this.capitalizeFirstLetter(
                            data.onchain_metadata.slot
                        ),
                        arm_armor: data.onchain_metadata["arm armor"] || 0,
                        leg_armor: data.onchain_metadata["leg armor"] || 0,
                        body_armor: data.onchain_metadata["body armor"] || 0,
                        head_armor: data.onchain_metadata["head armor"] || 0,
                        weight: data.onchain_metadata.weight,
                        amount: this.state.contentQunatity[key],
                        image: `https://nftstorage.link/ipfs/${data.onchain_metadata.image.slice(
                            7
                        )}`,
                    });
                }
                return userLoadout;
            } catch (err) {
                console.log(err);
                return [];
            }
        }
    };

    setOnChainLoadout = async () => {
        const loadout = await this.getUserLoadoutContent();
        this.setState({
            userLoadoutContentArray: loadout,
        });
    };

    RequestImageService = async () => {
        this.filterImageContentFunction();
        //console.log(this.state.imageContent);
        if (this.state.imageContent) {
            let imageLinks = {};
            try {
                for (var key in this.state.imageContent) {
                    // console.log(key);
                    const requestString = `https://cardano-mainnet.blockfrost.io/api/v0/assets/${this.state.imageContent[key]}`;
                    const response = await fetch(requestString, {
                        headers: {
                            project_id:
                                "mainnetbUyZDnp0NCCAkitKJk6jeiu28axzzpzG",
                        },
                    });

                    const data = await response.json();
                    imageLinks[
                        key
                    ] = `https://nftstorage.link/ipfs/${data.onchain_metadata.image.slice(
                        7
                    )}`;
                }
            } catch (err) {
                console.log(err);
                return [];
            }
            return imageLinks;
        }
    };

    setFilteredFunction = async () => {
        try {
            const images = await this.RequestImageService();
            this.setState({ filtered: images }, () => {
                this.setState({ filterSuccess: true });
            });
            this.refreshData();
        } catch (err) {
            console.log(err);
        }
    };

    filterImageContentFunction = () => {
        for (var key in this.state.imageContent) {
            if (!key.startsWith("adape")) {
                delete this.state.imageContent[key];
            }
        }
    };

    /**
     * The collateral is need for working with Plutus Scripts
     * Essentially you need to provide collateral to pay for fees if the
     * script execution fails after the script has been validated...
     * this should be an uncommon occurrence and would suggest the smart contract
     * would have been incorrectly written.
     * The amount of collateral to use is set in the wallet
     * @returns {Promise<void>}
     */
    getCollateral = async () => {
        let CollatUtxos = [];

        try {
            let collateral = [];

            const wallet = this.state.whichWalletSelected;
            if (wallet === "nami") {
                collateral = await this.API.experimental.getCollateral();
            } else {
                collateral = await this.API.getCollateral();
            }

            for (const x of collateral) {
                const utxo = TransactionUnspentOutput.from_bytes(
                    Buffer.from(x, "hex")
                );
                CollatUtxos.push(utxo);
                // console.log(utxo)
            }
            this.setState({ CollatUtxos });
        } catch (err) {
            console.log(err);
            this.props.isError(err);
        }
    };

    /**
     * Gets the current balance of in Lovelace in the user's wallet
     * This doesnt resturn the amounts of all other Tokens
     * For other tokens you need to look into the full UTXO list
     * @returns {Promise<void>}
     */
    getBalance = async () => {
        try {
            const balanceCBORHex = await this.API.getBalance();

            const balance = Value.from_bytes(Buffer.from(balanceCBORHex, "hex"))
                .coin()
                .to_str();
            this.setState({ balance });
        } catch (err) {
            console.log(err);
            this.props.isError(err);
        }
    };

    /**
     * Get the address from the wallet into which any spare UTXO should be sent
     * as change when building transactions.
     * @returns {Promise<void>}
     */
    getChangeAddress = async () => {
        try {
            const raw = await this.API.getChangeAddress();
            const changeAddress = Address.from_bytes(
                Buffer.from(raw, "hex")
            ).to_bech32();
            this.setState({ changeAddress });
        } catch (err) {
            console.log(err);
            this.props.isError(err);
        }
    };

    /**
     * This is the Staking address into which rewards from staking get paid into
     * @returns {Promise<void>}
     */
    getRewardAddresses = async () => {
        try {
            const raw = await this.API.getRewardAddresses();
            const rawFirst = raw[0];
            const rewardAddress = Address.from_bytes(
                Buffer.from(rawFirst, "hex")
            ).to_bech32();
            // console.log(rewardAddress)
            this.setState({ rewardAddress });
        } catch (err) {
            console.log(err);
            this.props.isError(err);
        }
    };

    /**
     * Gets previsouly used addresses
     * @returns {Promise<void>}
     */
    getUsedAddresses = async () => {
        try {
            const raw = await this.API.getUsedAddresses();
            const rawFirst = raw[0];
            const usedAddress = Address.from_bytes(
                Buffer.from(rawFirst, "hex")
            ).to_bech32();
            // console.log(rewardAddress)
            this.setState({ usedAddress });
        } catch (err) {
            console.log(err);
            this.props.isError(err);
        }
    };

    /**
     * Refresh all the data from the user's wallet
     * @returns {Promise<void>}
     */
    refreshData = async () => {
        this.generateScriptAddress();

        try {
            const walletFound = this.checkIfWalletFound();
            if (walletFound) {
                await this.getAPIVersion();
                await this.getWalletName();
                const walletEnabled = await this.enableWallet();
                if (walletEnabled) {
                    await this.getNetworkId();
                    await this.getUtxos();
                    await this.getCollateral();
                    await this.getBalance();
                    await this.getChangeAddress();
                    await this.getRewardAddresses();
                    await this.getUsedAddresses();
                    this.getWalletContent();
                    this.getPostedTx();
                } else {
                    await this.setState({
                        Utxos: null,
                        CollatUtxos: null,
                        balance: null,
                        changeAddress: null,
                        rewardAddress: null,
                        usedAddress: null,
                        walletContent: null,

                        txBody: null,
                        txBodyCborHex_unsigned: "",
                        txBodyCborHex_signed: "",
                        submittedTxHash: "",
                    });
                }
            } else {
                await this.setState({
                    walletIsEnabled: false,

                    Utxos: null,
                    CollatUtxos: null,
                    balance: null,
                    changeAddress: null,
                    rewardAddress: null,
                    usedAddress: null,
                    walletContent: null,

                    txBody: null,
                    txBodyCborHex_unsigned: "",
                    txBodyCborHex_signed: "",
                    submittedTxHash: "",
                });
            }
        } catch (err) {
            console.log(err);
            this.props.isError(err);
        }
    };

    /**
     * Every transaction starts with initializing the
     * TransactionBuilder and setting the protocol parameters
     * This is boilerplate
     * @returns {Promise<TransactionBuilder>}
     */
    initTransactionBuilder = async () => {
        const txBuilder = TransactionBuilder.new(
            TransactionBuilderConfigBuilder.new()
                .fee_algo(
                    LinearFee.new(
                        BigNum.from_str(this.protocolParams.linearFee.minFeeA),
                        BigNum.from_str(this.protocolParams.linearFee.minFeeB)
                    )
                )
                .pool_deposit(BigNum.from_str(this.protocolParams.poolDeposit))
                .key_deposit(BigNum.from_str(this.protocolParams.keyDeposit))
                .coins_per_utxo_word(
                    BigNum.from_str(this.protocolParams.coinsPerUtxoWord)
                )
                .max_value_size(this.protocolParams.maxValSize)
                .max_tx_size(this.protocolParams.maxTxSize)
                .prefer_pure_change(true)
                .build()
        );

        return txBuilder;
    };

    /**
     * Builds an object with all the UTXOs from the user's wallet
     * @returns {Promise<TransactionUnspentOutputs>}
     */
    getTxUnspentOutputs = async () => {
        let txOutputs = TransactionUnspentOutputs.new();
        for (const utxo of this.state.Utxos) {
            txOutputs.add(utxo.TransactionUnspentOutput);
        }
        return txOutputs;
    };

    /*  buildSendADATransaction = async () => {
        const generalMetadata = GeneralTransactionMetadata.new();
        const auxiliaryData = AuxiliaryData.new();
        const txBuilder = await this.initTransactionBuilder();
        const shelleyOutputAddress = Address.from_bech32(
            this.state.changeAddress
        );
        const shelleyChangeAddress = Address.from_bech32(
            this.state.changeAddress
        );

        generalMetadata.insert(
            BigNum.from_str("674"),
            encode_json_str_to_metadatum(
                JSON.stringify(this.props.userLoadoutMetadata)
            )
        );

        //console.log(generalMetadata);

        if (generalMetadata.len() > 0) {
            console.log("ser");
            auxiliaryData.set_metadata(generalMetadata);
        }

        if (auxiliaryData) {
            txBuilder.set_auxiliary_data(auxiliaryData);
        }

        txBuilder.add_output(
            TransactionOutput.new(
                shelleyOutputAddress,
                Value.new(BigNum.from_str(this.state.lovelaceToSend.toString()))
            )
        );

        // Find the available UTXOs in the wallet and
        // us them as Inputs
        const txUnspentOutputs = await this.getTxUnspentOutputs();
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

        let txVkeyWitnesses = await this.API.signTx(
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

        const submittedTxHash = await this.API.submitTx(
            Buffer.from(signedTx.to_bytes(), "utf8").toString("hex")
        );
        this.setState({ isEntered: true });
        console.log(submittedTxHash);
        //this.setState({ submittedTxHash });
    }; */

    /**
     * The transaction is build in 3 stages:
     * 1 - initialize the Transaction Builder
     * 2 - Add inputs and outputs
     * 3 - Calculate the fee and how much change needs to be given
     * 4 - Build the transaction body
     * 5 - Sign it (at this point the user will be prompted for
     * a password in his wallet)
     * 6 - Send the transaction
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        this.pollWallets();
        await this.refreshData();
    }

    getPostedTx = () => {
        if (this.state.postedTransactions) {
            this.props.getTransactions(this.state.postedTransactions);
        }
    };

    getWalletContent = async () => {
        if (
            this.state.walletContent &&
            this.state.filterSuccess &&
            this.state.userLoadoutContentArray &&
            this.getTxUnspentOutputs()
        ) {
            this.props.walletContent(
                this.state.walletContent,
                this.state.filtered,
                this.state.userLoadoutContentArray,
                await this.getTxUnspentOutputs()
            );
        }

        // console.log(this.state.walletContent);

        if (this.state.changeAddress) {
            this.props.getChange(this.state.changeAddress);
        }
    };

    render() {
        return <div></div>;
    }
}
