'use strict';

export default (ngModule) => {

    ngModule.controller('AddressPersonController', function (Restangular,$state,$scope,localStorageService,USER_CONFIG) {
    	
    		$scope.homeContact={};
    		$scope.urgentContact={};
    		$scope.otherContact={};
    	
    		$scope.division = {"北京":{"北京":["朝阳区","海淀区","西城区","东城区","崇文区","宣武区","丰台区","石景山区","门头沟","房山区","通州区","大兴区","顺义区","怀柔区","密云区","昌平区","平谷区","延庆县"]},"上海":{"上海":["黄浦区","徐汇区","长宁区","静安区","闸北区","虹口区","杨浦区","宝山区","闵行区","嘉定区","浦东新区","青浦区","松江区","金山区","奉贤区","普陀区","崇明县"]},"天津":{"天津":["苏家屯区","新民","法库县","辽中县","康平县","皇姑区","铁西区","大东区","沈河区","东陵区","于洪区","和平区","浑南新区","沈北新区","道义开发区"]},"重庆":{"重庆":["万州区","涪陵区","梁平县","南川区","潼南县","大足区","黔江区","武隆县","丰都县","奉节县","开县","云阳县","忠县","巫溪县","巫山县","石柱县","彭水县","垫江县","酉阳县","秀山县","城口县","璧山县","荣昌县","铜梁县","合川区","巴南区","北碚区","江津区","渝北区","长寿区","永川区","江北区","南岸区","九龙坡区","沙坪坝区","大渡口区","綦江区","渝中区","高新区","北部新区"]},"四川":{"成都":["高新西区","新都区","温江区","龙泉驿区","青白江区","彭州","崇州","邛崃","都江堰","郫县","新津县","双流县","大邑县","蒲江县","金堂县","青羊区","锦江区","金牛区","武侯区","成华区","高新区"],"自贡":["自流井区","贡井区","大安区","沿滩区","荣县","富顺县"],"攀枝花":["东区","西区","仁和区","米易县","盐边县"],"泸州":["江阳区","纳溪区","龙马潭区","泸县","合江县","叙永县","古蔺县"],"德阳":["旌阳区","中江县","罗江县","广汉","什邡","绵竹"],"绵阳":["涪城区","游仙区","三台县","盐亭县","安县","梓潼县","北川羌族自治县","平武县","江油"],"广元":["中区","元坝区","朝天区","旺苍县","青川县","剑阁县","苍溪县"],"遂宁":["船山区","安居区","蓬溪县","射洪县","大英县"],"内江":["中区","东兴区","威远县","资中县","隆昌县"],"乐山":["中区","沙湾区","五通桥区","金口河区","犍为县","井研县","夹江县","沐川县","峨边彝族自治县","马边彝族自治县","峨眉山"],"南充":["顺庆区","高坪区","嘉陵区","南部县","营山县","蓬安县","仪陇县","西充县","阆中"],"眉山":["东坡区","仁寿县","彭山县","洪雅县","丹棱县","青神县"],"宜宾":["翠屏区","宜宾县","南溪县","江安县","长宁县","高县","珙县","筠连县","兴文县","屏山县"],"广安":["广安区","岳池县","武胜县","邻水县","华莹"],"达州":["通川区","达县","宣汉县","开江县","大竹县","渠县","万源"],"雅安":["雨城区","名山县","荥经县","汉源县","石棉县","天全县","芦山县","宝兴县"],"巴中":["巴州区","通江县","南江县","平昌县"],"资阳":["雁江区","安岳县","乐至县","简阳"],"阿坝藏族羌族自治州":["汶川县","理县","茂县","松潘县","九寨沟县","金川县","小金县","黑水县","马尔康县","壤塘县","阿坝县","若尔盖县","红原县"],"甘孜藏族自治州":["康定县","泸定县","丹巴县","九龙县","雅江县","道孚县","炉霍县","甘孜县","新龙县","德格县","白玉县","石渠县","色达县","理塘县","巴塘县","乡城县","稻城县","得荣县"],"凉山彝族自治州":["西昌","木里藏族自治县","盐源县","德昌县","会理县","会东县","宁南县","普格县","布拖县","金阳县","昭觉县","喜德县","冕宁县","越西县","甘洛县","美姑县","雷波县"]},"贵州":{"贵阳":["南明区","云岩区","花溪区","乌当区","白云区","小河区","开阳县","息烽县","修文县","清镇"],"六盘水":["钟山区","六枝特区","水城县","盘县"],"遵义":["红花岗区","汇川区","遵义县","桐梓县","绥阳县","正安县","道真仡佬族苗族自治县","务川仡佬族苗族自治县","凤冈县","湄潭县","余庆县","习水县","赤水","仁怀"],"安顺":["西秀区","平坝县","普定县","镇宁布依族苗族自治县","关岭布依族苗族自治县","紫云苗族布依族自治县"],"铜仁地区":["铜仁","江口县","玉屏侗族自治县","石阡县","思南县","印江土家族苗族自治县","德江县","沿河土家族自治县","松桃苗族自治县","万山特区"],"黔西南布依族苗族自治州":["兴义","兴仁县","普安县","晴隆县","贞丰县","望谟县","册亨县","安龙县"],"毕节地区":["毕节","大方县","黔西县","金沙县","织金县","纳雍县","威宁彝族回族苗族自治县","赫章县"],"黔东南苗族侗族自治州":["凯里","黄平县","施秉县","三穗县","镇远县","岑巩县","天柱县","锦屏县","剑河县","台江县","黎平县","榕江县","从江县","雷山县","麻江县","丹寨县"],"黔南布依族苗族自治州":["都匀","福泉","荔波县","贵定县","瓮安县","独山县","平塘县","罗甸县","长顺县","龙里县","惠水县","三都水族自治县"]},"云南":{"昆明":["五华区","盘龙区","官渡区","西山区","东川区","呈贡县","晋宁县","富民县","宜良县","石林彝族自治县","嵩明县","禄劝彝族苗族自治县","寻甸回族彝族自治县","安宁"],"曲靖":["麒麟区","马龙县","陆良县","师宗县","罗平县","富源县","会泽县","沾益县","宣威"],"玉溪":["红塔区","江川县","澄江县","通海县","华宁县","易门县","峨山彝族自治县","新平彝族傣族自治县","元江哈尼族彝族傣族自治县"],"保山":["隆阳区","施甸县","腾冲县","龙陵县","昌宁县"],"昭通":["昭阳区","鲁甸县","巧家县","盐津县","大关县","永善县","绥江县","镇雄县","彝良县","威信县","水富县"],"丽江":["古城区","玉龙纳西族自治县","永胜县","华坪县","宁蒗彝族自治县"],"思茅":["翠云区","普洱哈尼族彝族自治县","墨江哈尼族自治县","景东彝族自治县","景谷傣族彝族自治县","镇沅彝族哈尼族拉祜族自治县","江城哈尼族彝族自治县","孟连傣族拉祜族佤族自治县","澜沧拉祜族自治县","西盟佤族自治县"],"临沧":["临翔区","凤庆县","云县","永德县","镇康县","双江拉祜族佤族布朗族傣族自治县","耿马傣族佤族自治县","沧源佤族自治县"],"楚雄彝族自治州":["楚雄","双柏县","牟定县","南华县","姚安县","大姚县","永仁县","元谋县","武定县","禄丰县"],"红河哈尼族彝族自治州":["个旧","开远","蒙自县","屏边苗族自治县","建水县","石屏县","弥勒县","泸西县","元阳县","红河县","金平苗族瑶族傣族自治县","绿春县","河口瑶族自治县"],"文山壮族苗族自治州":["文山县","砚山县","西畴县","麻栗坡县","马关县","丘北县","广南县","富宁县"],"西双版纳傣族自治州":["景洪","勐海县","勐腊县"],"大理白族自治州":["大理","漾濞彝族自治县","祥云县","宾川县","弥渡县","南涧彝族自治县","巍山彝族回族自治县","永平县","云龙县","洱源县","剑川县","鹤庆县"],"德宏傣族景颇族自治州":["瑞丽","潞西","梁河县","盈江县","陇川县"],"怒江傈僳族自治州":["泸水县","福贡县","贡山独龙族怒族自治县","兰坪白族普米族自治县"],"迪庆藏族自治州":["香格里拉县","德钦县","维西傈僳族自治县"]},"西藏":{"拉萨":["城关区","林周县","当雄县","尼木县","曲水县","堆龙德庆县","达孜县","墨竹工卡县"],"昌都地区":["昌都县","江达县","贡觉县","类乌齐县","丁青县","察雅县","八宿县","左贡县","芒康县","洛隆县","边坝县"],"山南地区":["乃东县","扎囊县","贡嘎县","桑日县","琼结县","曲松县","措美县","洛扎县","加查县","隆子县","错那县","浪卡子县"],"日喀则地区":["日喀则","南木林县","江孜县","定日县","萨迦县","拉孜县","昂仁县","谢通门县","白朗县","仁布县","康马县","定结县","仲巴县","亚东县","吉隆县","聂拉木县","萨嘎县","岗巴县"],"那曲地区":["那曲县","嘉黎县","比如县","聂荣县","安多县","申扎县","索县","班戈县","巴青县","尼玛县"],"阿里地区":["普兰县","札达县","噶尔县","日土县","革吉县","改则县","措勤县"],"林芝地区":["林芝县","工布江达县","米林县","墨脱县","波密县","察隅县","朗县"]},"河南":{"郑州":["中原区","二七区","管城回族区","金水区","上街区","邙山区","中牟县","巩义","荥阳","新密","新郑","登封"],"开封":["龙亭区","顺河回族区","鼓楼区","南关区","郊区","杞县","通许县","尉氏县","开封县","兰考县"],"洛阳":["老城区","西工区","廛河回族区","涧西区","吉利区","洛龙区","孟津县","新安县","栾川县","嵩县","汝阳县","宜阳县","洛宁县","伊川县","偃师"],"平顶山":["新华区","卫东区","石龙区","湛河区","宝丰县","叶县","鲁山县","郏县","舞钢","汝州"],"安阳":["文峰区","北关区","殷都区","龙安区","安阳县","汤阴县","滑县","内黄县","林州"],"鹤壁":["鹤山区","山城区","淇滨区","浚县","淇县"],"新乡":["红旗区","卫滨区","凤泉区","牧野区","新乡县","获嘉县","原阳县","延津县","封丘县","长垣县","卫辉","辉县"],"焦作":["解放区","中站区","马村区","山阳区","修武县","博爱县","武陟县","温县","济源","沁阳","孟州"],"濮阳":["华龙区","清丰县","南乐县","范县","台前县","濮阳县"],"许昌":["魏都区","许昌县","鄢陵县","襄城县","禹州","长葛"],"漯河":["源汇区","郾城区","召陵区","舞阳县","临颍县"],"三门峡":["湖滨区","渑池县","陕县","卢氏县","义马","灵宝"],"南阳":["宛城区","卧龙区","南召县","方城县","西峡县","镇平县","内乡县","淅川县","社旗县","唐河县","新野县","桐柏县","邓州"],"商丘":["梁园区","睢阳区","民权县","睢县","宁陵县","柘城县","虞城县","夏邑县","永城"],"信阳":["师河区","平桥区","罗山县","光山县","新县","商城县","固始县","潢川县","淮滨县","息县"],"周口":["川汇区","扶沟县","西华县","商水县","沈丘县","郸城县","淮阳县","太康县","鹿邑县","项城"],"驻马店":["驿城区","西平县","上蔡县","平舆县","正阳县","确山县","泌阳县","汝南县","遂平县","新蔡县"]},"湖北":{"武汉":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"黄石":["黄石港区","西塞山区","下陆区","铁山区","阳新县","大冶"],"十堰":["茅箭区","张湾区","郧县","郧西县","竹山县","竹溪县","房县","丹江口"],"宜昌":["西陵区","伍家岗区","点军区","猇亭区","夷陵区","远安县","兴山县","秭归县","长阳土家族自治县","五峰土家族自治县","宜都","当阳","枝江"],"襄樊":["襄城区","樊城区","襄阳区","南漳县","谷城县","保康县","老河口","枣阳","宜城"],"鄂州":["梁子湖区","华容区","鄂城区"],"荆门":["东宝区","掇刀区","京山县","沙洋县","钟祥"],"孝感":["孝南区","孝昌县","大悟县","云梦县","应城","安陆","汉川"],"荆州":["沙区","荆州区","公安县","监利县","江陵县","石首","洪湖","松滋"],"黄冈":["黄州区","团风县","红安县","罗田县","英山县","浠水县","蕲春县","黄梅县","麻城","武穴"],"咸宁":["咸安区","嘉鱼县","通城县","崇阳县","通山县","赤壁"],"随州":["曾都区","广水"],"恩施土家族苗族自治州":["恩施","利川","建始县","巴东县","宣恩县","咸丰县","来凤县","鹤峰县"],"直辖行政单位":["仙桃","潜江","天门","神农架林区"]},"湖南":{"长沙":["望城区","芙蓉区","岳麓区","雨花区","开福区","天心区","浏阳","长沙县","宁乡县"],"株洲":["荷塘区","芦淞区","石峰区","天元区","株洲县","攸县","茶陵县","炎陵县","醴陵"],"湘潭":["雨湖区","岳塘区","湘潭县","湘乡","韶山"],"衡阳":["珠晖区","雁峰区","石鼓区","蒸湘区","南岳区","衡阳县","衡南县","衡山县","衡东县","祁东县","耒阳","常宁"],"邵阳":["双清区","大祥区","北塔区","邵东县","新邵县","邵阳县","隆回县","洞口县","绥宁县","新宁县","城步苗族自治县","武冈"],"岳阳":["岳阳楼区","云溪区","君山区","岳阳县","华容县","湘阴县","平江县","汨罗","临湘"],"常德":["武陵区","鼎城区","安乡县","汉寿县","澧县","临澧县","桃源县","石门县","津"],"张家界":["永定区","武陵源区","慈利县","桑植县"],"益阳":["资阳区","赫山区","南县","桃江县","安化县","沅江"],"郴州":["北湖区","苏仙区","桂阳县","宜章县","永兴县","嘉禾县","临武县","汝城县","桂东县","安仁县","资兴"],"永州":["芝山区","冷水滩区","祁阳县","东安县","双牌县","道县","江永县","宁远县","蓝山县","新田县","江华瑶族自治县"],"怀化":["鹤城区","中方县","沅陵县","辰溪县","溆浦县","会同县","麻阳苗族自治县","新晃侗族自治县","芷江侗族自治县","靖州苗族侗族自治县","通道侗族自治县","洪江"],"娄底":["娄星区","双峰县","新化县","冷水江","涟源"],"湘西土家族苗族自治州":["吉首","泸溪县","凤凰县","花垣县","保靖县","古丈县","永顺县","龙山县"]},"广东":{"广州":["荔湾区","越秀区","海珠区","天河区","白云区","黄埔区","番禺区","花都区","南沙区","萝岗区","增城","从化"],"韶关":["武江区","浈江区","曲江区","始兴县","仁化县","翁源县","乳源瑶族自治县","新丰县","乐昌","南雄"],"深圳":["南山区","罗湖区","福田区","宝安区","光明新区","坪山新区","大鹏新区","龙岗区","盐田区","龙华新区"],"珠海":["香洲区","斗门区","金湾区"],"汕头":["龙湖区","金平区","濠江区","潮阳区","潮南区","澄海区","南澳县"],"佛山":["禅城区","南海区","顺德区","三水区","高明区"],"江门":["蓬江区","江海区","新会区","台山","开平","鹤山","恩平"],"湛江":["赤坎区","霞山区","坡头区","麻章区","遂溪县","徐闻县","廉江","雷州","吴川"],"茂名":["茂南区","茂港区","电白县","高州","化州","信宜"],"肇庆":["端州区","鼎湖区","广宁县","怀集县","封开县","德庆县","高要","四会"],"惠州":["惠城区","惠阳区","博罗县","惠东县","龙门县"],"梅州":["梅江区","梅县","大埔县","丰顺县","五华县","平远县","蕉岭县","兴宁"],"汕尾":["城区","海丰县","陆河县","陆丰"],"河源":["源城区","紫金县","龙川县","连平县","和平县","东源县"],"阳江":["江城区","阳西县","阳东县","阳春"],"清远":["清城区","佛冈县","阳山县","连山壮族瑶族自治县","连南瑶族自治县","清新县","英德","连州"],"东莞":["东莞"],"中山":["中山"],"潮州":["湘桥区","潮安县","饶平县"],"揭阳":["榕城区","揭东县","揭西县","惠来县","普宁"],"云浮":["云城区","新兴县","郁南县","云安县","罗定"]},"广西":{"南宁":["兴宁区","青秀区","江南区","西乡塘区","良庆区","邕宁区","武鸣县","隆安县","马山县","上林县","宾阳县","横县"],"柳州":["城中区","鱼峰区","柳南区","柳北区","柳江县","柳城县","鹿寨县","融安县","融水苗族自治县","三江侗族自治县"],"桂林":["秀峰区","叠彩区","象山区","七星区","雁山区","阳朔县","临桂县","灵川县","全州县","兴安县","永福县","灌阳县","龙胜各族自治县","资源县","平乐县","荔蒲县","恭城瑶族自治县"],"梧州":["万秀区","蝶山区","长洲区","苍梧县","藤县","蒙山县","岑溪"],"北海":["海城区","银海区","铁山港区","合浦县"],"防城港":["港口区","防城区","上思县","东兴"],"钦州":["钦南区","钦北区","灵山县","浦北县"],"贵港":["港北区","港南区","覃塘区","平南县","桂平"],"玉林":["玉州区","容县","陆川县","博白县","兴业县","北流"],"百色":["右江区","田阳县","田东县","平果县","德保县","靖西县","那坡县","凌云县","乐业县","田林县","西林县","隆林各族自治县"],"贺州":["八步区","昭平县","钟山县","富川瑶族自治县"],"河池":["金城江区","南丹县","天峨县","凤山县","东兰县","罗城仫佬族自治县","环江毛南族自治县","巴马瑶族自治县","都安瑶族自治县","大化瑶族自治县","宜州"],"来宾":["兴宾区","忻城县","象州县","武宣县","金秀瑶族自治县","合山"],"崇左":["江洲区","扶绥县","宁明县","龙州县","大新县","天等县","凭祥"]},"陕西":{"西安":["新城区","碑林区","莲湖区","灞桥区","未央区","雁塔区","阎良区","临潼区","长安区","蓝田县","周至县","户县","高陵县"],"铜川":["王益区","印台区","耀州区","宜君县"],"宝鸡":["渭滨区","金台区","陈仓区","凤翔县","岐山县","扶风县","眉县","陇县","千阳县","麟游县","凤县","太白县"],"咸阳":["秦都区","杨凌区","渭城区","三原县","泾阳县","乾县","礼泉县","永寿县","彬县","长武县","旬邑县","淳化县","武功县","兴平"],"渭南":["临渭区","华县","潼关县","大荔县","合阳县","澄城县","蒲城县","白水县","富平县","韩城","华阴"],"延安":["宝塔区","延长县","延川县","子长县","安塞县","志丹县","吴旗县","甘泉县","富县","洛川县","宜川县","黄龙县","黄陵县"],"汉中":["汉台区","南郑县","城固县","洋县","西乡县","勉县","宁强县","略阳县","镇巴县","留坝县","佛坪县"],"榆林":["榆阳区","神木县","府谷县","横山县","靖边县","定边县","绥德县","米脂县","佳县","吴堡县","清涧县","子洲县"],"安康":["汉滨区","汉阴县","石泉县","宁陕县","紫阳县","岚皋县","平利县","镇坪县","旬阳县","白河县"],"商洛":["商州区","洛南县","丹凤县","商南县","山阳县","镇安县","柞水县"]},"甘肃":{"兰州":["城关区","七里河区","西固区","安宁区","红古区","永登县","皋兰县","榆中县"],"嘉峪关":["辖区"],"金昌":["金川区","永昌县"],"白银":["白银区","平川区","靖远县","会宁县","景泰县"],"天水":["秦城区","北道区","清水县","秦安县","甘谷县","武山县","张家川回族自治县"],"武威":["凉州区","民勤县","古浪县","天祝藏族自治县"],"张掖":["甘州区","肃南裕固族自治县","民乐县","临泽县","高台县","山丹县"],"平凉":["崆峒区","泾川县","灵台县","崇信县","华亭县","庄浪县","静宁县"],"酒泉":["肃州区","金塔县","安西县","肃北蒙古族自治县","阿克塞哈萨克族自治县","玉门","敦煌"],"庆阳":["西峰区","庆城县","环县","华池县","合水县","正宁县","宁县","镇原县"],"定西":["安定区","通渭县","陇西县","渭源县","临洮县","漳县","岷县"],"陇南":["武都区","成县","文县","宕昌县","康县","西和县","礼县","徽县","两当县"],"临夏回族自治州":["临夏","临夏县","康乐县","永靖县","广河县","和政县","东乡族自治县","积石山保安族东乡族撒拉族自治县"],"甘南藏族自治州":["合作","临潭县","卓尼县","舟曲县","迭部县","玛曲县","碌曲县","夏河县"]},"青海":{"西宁":["城东区","城中区","城西区","城北区","大通回族土族自治县","湟中县","湟源县"],"海东地区":["平安县","民和回族土族自治县","乐都县","互助土族自治县","化隆回族自治县","循化撒拉族自治县"],"海北藏族自治州":["门源回族自治县","祁连县","海晏县","刚察县"],"黄南藏族自治州":["同仁县","尖扎县","泽库县","河南蒙古族自治县"],"海南藏族自治州":["共和县","同德县","贵德县","兴海县","贵南县"],"果洛藏族自治州":["玛沁县","班玛县","甘德县","达日县","久治县","玛多县"],"玉树藏族自治州":["玉树县","杂多县","称多县","治多县","囊谦县","曲麻莱县"],"海西蒙古族藏族自治州":["格尔木","德令哈","乌兰县","都兰县","天峻县"]},"宁夏":{"银川":["兴庆区","西夏区","金凤区","永宁县","贺兰县","灵武"],"石嘴山":["大武口区","惠农区","平罗县"],"吴忠":["利通区","盐池县","同心县","青铜峡"],"固原":["原州区","西吉县","隆德县","泾源县","彭阳县","海原县"],"中卫":["沙坡头区","中宁县"]},"新疆":{"乌鲁木齐":["天山区","沙依巴克区","新区","水磨沟区","头屯河区","达坂城区","东山区","乌鲁木齐县"],"克拉玛依":["独山子区","克拉玛依区","白碱滩区","乌尔禾区"],"吐鲁番地区":["吐鲁番","鄯善县","托克逊县"],"哈密地区":["哈密","巴里坤哈萨克自治县","伊吾县"],"昌吉回族自治州":["昌吉","阜康","米泉","呼图壁县","玛纳斯县","奇台县","吉木萨尔县","木垒哈萨克自治县"],"博尔塔拉蒙古自治州":["博乐","精河县","温泉县"],"巴音郭楞蒙古自治州":["库尔勒","轮台县","尉犁县","若羌县","且末县","焉耆回族自治县","和静县","和硕县","博湖县"],"阿克苏地区":["阿克苏","温宿县","库车县","沙雅县","新和县","拜城县","乌什县","阿瓦提县","柯坪县"],"克孜勒苏柯尔克孜自治州":["阿图什","阿克陶县","阿合奇县","乌恰县"],"喀什地区":["喀什","疏附县","疏勒县","英吉沙县","泽普县","莎车县","叶城县","麦盖提县","岳普湖县","伽师县","巴楚县","塔什库尔干塔吉克自治县"],"和田地区":["和田","和田县","墨玉县","皮山县","洛浦县","策勒县","于田县","民丰县"],"伊犁哈萨克自治州":["伊宁","奎屯","伊宁县","察布查尔锡伯自治县","霍城县","巩留县","新源县","昭苏县","特克斯县","尼勒克县"],"塔城地区":["塔城","乌苏","额敏县","沙湾县","托里县","裕民县","和布克赛尔蒙古自治县"],"阿勒泰地区":["阿勒泰","布尔津县","富蕴县","福海县","哈巴河县","青河县","吉木乃县"],"直辖行政单位":["石河子","阿拉尔","图木舒克","五家渠"]},"河北":{"石家庄":["长安区","桥东区","桥西区","新华区","井陉矿区","裕华区","井陉县","正定县","栾城县","行唐县","灵寿县","高邑县","深泽县","赞皇县","无极县","平山县","元氏县","赵县","辛集","藁城","晋州","新乐","鹿泉"],"唐山":["路南区","路北区","古冶区","开平区","丰南区","丰润区","滦县","滦南县","乐亭县","迁西县","玉田县","唐海县","遵化","迁安"],"秦皇岛":["海港区","山海关区","北戴河区","青龙满族自治县","昌黎县","抚宁县","卢龙县"],"邯郸":["邯山区","丛台区","复兴区","峰峰矿区","邯郸县","临漳县","成安县","大名县","涉县","磁县","肥乡县","永年县","邱县","鸡泽县","广平县","馆陶县","魏县","曲周县","武安"],"邢台":["桥东区","桥西区","邢台县","临城县","内丘县","柏乡县","隆尧县","任县","南和县","宁晋县","巨鹿县","新河县","广宗县","平乡县","威县","清河县","临西县","南宫","沙河"],"保定":["新区","北区","南区","满城县","清苑县","涞水县","阜平县","徐水县","定兴县","唐县","高阳县","容城县","涞源县","望都县","安新县","易县","曲阳县","蠡县","顺平县","博野县","雄县","涿州","定州","安国","高碑店"],"张家口":["桥东区","桥西区","宣化区","下花园区","宣化县","张北县","康保县","沽源县","尚义县","蔚县","阳原县","怀安县","万全县","怀来县","涿鹿县","赤城县","崇礼县"],"承德":["双桥区","双滦区","鹰手营子矿区","承德县","兴隆县","平泉县","滦平县","隆化县","丰宁满族自治县","宽城满族自治县","围场满族蒙古族自治县"],"沧州":["新华区","运河区","沧县","青县","东光县","海兴县","盐山县","肃宁县","南皮县","吴桥县","献县","孟村回族自治县","泊头","任丘","黄骅","河间"],"廊坊":["安次区","广阳区","固安县","永清县","香河县","大城县","文安县","大厂回族自治县","霸州","三河"],"衡水":["桃城区","枣强县","武邑县","武强县","饶阳县","安平县","故城县","景县","阜城县","冀州","深州"]},"山西":{"太原":["小店区","迎泽区","杏花岭区","尖草坪区","万柏林区","晋源区","清徐县","阳曲县","娄烦县","古交"],"大同":["城区","矿区","南郊区","新荣区","阳高县","天镇县","广灵县","灵丘县","浑源县","左云县","大同县"],"阳泉":["城区","矿区","郊区","平定县","盂县"],"长治":["城区","郊区","长治县","襄垣县","屯留县","平顺县","黎城县","壶关县","长子县","武乡县","沁县","沁源县","潞城"],"晋城":["城区","沁水县","阳城县","陵川县","泽州县","高平"],"朔州":["朔城区","平鲁区","山阴县","应县","右玉县","怀仁县"],"晋中":["榆次区","榆社县","左权县","和顺县","昔阳县","寿阳县","太谷县","祁县","平遥县","灵石县","介休"],"运城":["盐湖区","临猗县","万荣县","闻喜县","稷山县","新绛县","绛县","垣曲县","夏县","平陆县","芮城县","永济","河津"],"忻州":["忻府区","定襄县","五台县","代县","繁峙县","宁武县","静乐县","神池县","五寨县","岢岚县","河曲县","保德县","偏关县","原平"],"临汾":["尧都区","曲沃县","翼城县","襄汾县","洪洞县","古县","安泽县","浮山县","吉县","乡宁县","大宁县","隰县","永和县","蒲县","汾西县","侯马","霍州"],"吕梁":["离石区","文水县","交城县","兴县","临县","柳林县","石楼县","岚县","方山县","中阳县","交口县","孝义","汾阳"]},"内蒙古":{"呼和浩特":["新城区","回民区","玉泉区","赛罕区","土默特左旗","托克托县","和林格尔县","清水河县","武川县"],"包头":["东河区","昆都仑区","青山区","石拐区","白云矿区","九原区","土默特右旗","固阳县","达尔罕茂明安联合旗"],"乌海":["海勃湾区","海南区","乌达区"],"赤峰":["红山区","元宝山区","松山区","阿鲁科尔沁旗","巴林左旗","巴林右旗","林西县","克什克腾旗","翁牛特旗","喀喇沁旗","宁城县","敖汉旗"],"通辽":["科尔沁区","科尔沁左翼中旗","科尔沁左翼后旗","开鲁县","库伦旗","奈曼旗","扎鲁特旗","霍林郭勒"],"鄂尔多斯":["东胜区","达拉特旗","准格尔旗","鄂托克前旗","鄂托克旗","杭锦旗","乌审旗","伊金霍洛旗"],"呼伦贝尔":["海拉尔区","阿荣旗","莫力达瓦达斡尔族自治旗","鄂伦春自治旗","鄂温克族自治旗","陈巴尔虎旗","新巴尔虎左旗","新巴尔虎右旗","满洲里","牙克石","扎兰屯","额尔古纳","根河"],"巴彦淖尔":["临河区","五原县","磴口县","乌拉特前旗","乌拉特中旗","乌拉特后旗","杭锦后旗"],"乌兰察布":["集宁区","卓资县","化德县","商都县","兴和县","凉城县","察哈尔右翼前旗","察哈尔右翼中旗","察哈尔右翼后旗","四子王旗","丰镇"],"兴安盟":["乌兰浩特","阿尔山","科尔沁右翼前旗","科尔沁右翼中旗","扎赉特旗","突泉县"],"锡林郭勒盟":["二连浩特","锡林浩特","阿巴嘎旗","苏尼特左旗","苏尼特右旗","东乌珠穆沁旗","西乌珠穆沁旗","太仆寺旗","镶黄旗","正镶白旗","正蓝旗","多伦县"],"阿拉善盟":["阿拉善左旗","阿拉善右旗","额济纳旗"]},"江苏":{"南京":["玄武区","白下区","秦淮区","建邺区","鼓楼区","下关区","浦口区","栖霞区","雨花台区","江宁区","六合区","溧水县","高淳县"],"无锡":["崇安区","南长区","北塘区","锡山区","惠山区","滨湖区","江阴","宜兴"],"徐州":["鼓楼区","云龙区","九里区","贾汪区","泉山区","丰县","沛县","铜山县","睢宁县","新沂","邳州"],"常州":["天宁区","钟楼区","戚墅堰区","新北区","武进区","溧阳","金坛"],"苏州":["沧浪区","平江区","金阊区","虎丘区","吴中区","相城区","常熟","张家港","昆山","吴江","太仓"],"南通":["崇川区","港闸区","海安县","如东县","启东","如皋","通州","海门"],"连云港":["连云区","新浦区","海州区","赣榆县","东海县","灌云县","灌南县"],"淮安":["清河区","楚州区","淮阴区","清浦区","涟水县","洪泽县","盱眙县","金湖县"],"盐城":["亭湖区","盐都区","响水县","滨海县","阜宁县","射阳县","建湖县","东台","大丰"],"扬州":["广陵区","邗江区","郊区","宝应县","仪征","高邮","江都"],"镇江":["京口区","润州区","丹徒区","丹阳","扬中","句容"],"泰州":["海陵区","高港区","兴化","靖江","泰兴","姜堰"],"宿迁":["宿城区","宿豫区","沭阳县","泗阳县","泗洪县"]},"浙江":{"杭州":["上城区","下城区","江干区","拱墅区","西湖区","滨江区","萧山区","余杭区","桐庐县","淳安县","建德","富阳","临安"],"宁波":["海曙区","江东区","江北区","北仑区","镇海区","鄞州区","象山县","宁海县","余姚","慈溪","奉化"],"温州":["鹿城区","龙湾区","瓯海区","洞头县","永嘉县","平阳县","苍南县","文成县","泰顺县","瑞安","乐清"],"嘉兴":["秀城区","秀洲区","嘉善县","海盐县","海宁","平湖","桐乡"],"湖州":["吴兴区","南浔区","德清县","长兴县","安吉县"],"绍兴":["越城区","绍兴县","新昌县","诸暨","上虞","嵊州"],"金华":["婺城区","金东区","武义县","浦江县","磐安县","兰溪","义乌","东阳","永康"],"衢州":["柯城区","衢江区","常山县","开化县","龙游县","江山"],"舟山":["定海区","普陀区","岱山县","嵊泗县"],"台州":["椒江区","黄岩区","路桥区","玉环县","三门县","天台县","仙居县","温岭","临海"],"丽水":["莲都区","青田县","缙云县","遂昌县","松阳县","云和县","庆元县","景宁畲族自治县","龙泉"]},"安徽":{"合肥":["瑶海区","庐阳区","蜀山区","包河区","长丰县","肥东县","肥西县"],"芜湖":["镜湖区","马塘区","新芜区","鸠江区","芜湖县","繁昌县","南陵县"],"蚌埠":["龙子湖区","蚌山区","禹会区","淮上区","怀远县","五河县","固镇县"],"淮南":["大通区","田家庵区","谢家集区","八公山区","潘集区","凤台县"],"马鞍山":["金家庄区","花山区","雨山区","当涂县"],"淮北":["杜集区","相山区","烈山区","濉溪县"],"铜陵":["铜官山区","狮子山区","郊区","铜陵县"],"安庆":["迎江区","大观区","郊区","怀宁县","枞阳县","潜山县","太湖县","宿松县","望江县","岳西县","桐城"],"黄山":["屯溪区","黄山区","徽州区","歙县","休宁县","黟县","祁门县"],"滁州":["琅琊区","南谯区","来安县","全椒县","定远县","凤阳县","天长","明光"],"阜阳":["颍州区","颍东区","颍泉区","临泉县","太和县","阜南县","颍上县","界首"],"宿州":["墉桥区","砀山县","萧县","灵璧县","泗县"],"巢湖":["居巢区","庐江县","无为县","含山县","和县"],"六安":["金安区","裕安区","寿县","霍邱县","舒城县","金寨县","霍山县"],"亳州":["谯城区","涡阳县","蒙城县","利辛县"],"池州":["贵池区","东至县","石台县","青阳县"],"宣城":["宣州区","郎溪县","广德县","泾县","绩溪县","旌德县","宁国"]},"福建":{"福州":["鼓楼区","台江区","仓山区","马尾区","晋安区","闽侯县","连江县","罗源县","闽清县","永泰县","平潭县","福清","长乐"],"厦门":["思明区","海沧区","湖里区","集美区","同安区","翔安区"],"莆田":["城厢区","涵江区","荔城区","秀屿区","仙游县"],"三明":["梅列区","三元区","明溪县","清流县","宁化县","大田县","尤溪县","沙县","将乐县","泰宁县","建宁县","永安"],"泉州":["鲤城区","丰泽区","洛江区","泉港区","惠安县","安溪县","永春县","德化县","金门县","石狮","晋江","南安"],"漳州":["芗城区","龙文区","云霄县","漳浦县","诏安县","长泰县","东山县","南靖县","平和县","华安县","龙海"],"南平":["延平区","顺昌县","浦城县","光泽县","松溪县","政和县","邵武","武夷山","建瓯","建阳"],"龙岩":["新罗区","长汀县","永定县","上杭县","武平县","连城县","漳平"],"宁德":["蕉城区","霞浦县","古田县","屏南县","寿宁县","周宁县","柘荣县","福安","福鼎"]},"江西":{"南昌":["东湖区","西湖区","青云谱区","湾里区","青山湖区","南昌县","新建县","安义县","进贤县"],"景德镇":["昌江区","珠山区","浮梁县","乐平"],"萍乡":["安源区","湘东区","莲花县","上栗县","芦溪县"],"九江":["庐山区","浔阳区","九江县","武宁县","修水县","永修县","德安县","星子县","都昌县","湖口县","彭泽县","瑞昌"],"新余":["渝水区","分宜县"],"鹰潭":["月湖区","余江县","贵溪"],"赣州":["章贡区","赣县","信丰县","大余县","上犹县","崇义县","安远县","龙南县","定南县","全南县","宁都县","于都县","兴国县","会昌县","寻乌县","石城县","瑞金","南康"],"吉安":["吉州区","青原区","吉安县","吉水县","峡江县","新干县","永丰县","泰和县","遂川县","万安县","安福县","永新县","井冈山"],"宜春":["袁州区","奉新县","万载县","上高县","宜丰县","靖安县","铜鼓县","丰城","樟树","高安"],"抚州":["临川区","南城县","黎川县","南丰县","崇仁县","乐安县","宜黄县","金溪县","资溪县","东乡县","广昌县"],"上饶":["信州区","上饶县","广丰县","玉山县","铅山县","横峰县","弋阳县","余干县","鄱阳县","万年县","婺源县","德兴"]},"山东":{"济南":["历下区","中区","槐荫区","天桥区","历城区","长清区","平阴县","济阳县","商河县","章丘"],"青岛":["南区","北区","四方区","黄岛区","崂山区","李沧区","城阳区","胶州","即墨","平度","胶南","莱西"],"淄博":["淄川区","张店区","博山区","临淄区","周村区","桓台县","高青县","沂源县"],"枣庄":["中区","薛城区","峄城区","台儿庄区","山亭区","滕州"],"东营":["东营区","河口区","垦利县","利津县","广饶县"],"烟台":["芝罘区","福山区","牟平区","莱山区","长岛县","龙口","莱阳","莱州","蓬莱","招远","栖霞","海阳"],"潍坊":["潍城区","寒亭区","坊子区","奎文区","临朐县","昌乐县","青州","诸城","寿光","安丘","高密","昌邑"],"济宁":["中区","任城区","微山县","鱼台县","金乡县","嘉祥县","汶上县","泗水县","梁山县","曲阜","兖州","邹城"],"泰安":["泰山区","岱岳区","宁阳县","东平县","新泰","肥城"],"威海":["环翠区","文登","荣成","乳山"],"日照":["东港区","岚山区","五莲县","莒县"],"莱芜":["莱城区","钢城区"],"临沂":["兰山区","罗庄区","河东区","沂南县","郯城县","沂水县","苍山县","费县","平邑县","莒南县","蒙阴县","临沭县"],"德州":["德城区","陵县","宁津县","庆云县","临邑县","齐河县","平原县","夏津县","武城县","乐陵","禹城"],"聊城":["东昌府区","阳谷县","莘县","茌平县","东阿县","冠县","高唐县","临清"],"滨州":["滨城区","惠民县","阳信县","无棣县","沾化县","博兴县","邹平县"],"荷泽":["牡丹区","曹县","单县","成武县","巨野县","郓城县","鄄城县","定陶县","东明县"]},"辽宁":{"沈阳":["和平区","沈河区","大东区","皇姑区","铁西区","苏家屯区","东陵区","新城子区","于洪区","辽中县","康平县","法库县","新民"],"大连":["中山区","西岗区","沙河口区","甘井子区","旅顺口区","金州区","长海县","瓦房店","普兰店","庄河"],"鞍山":["铁东区","铁西区","立山区","千山区","台安县","岫岩满族自治县","海城"],"抚顺":["新抚区","东洲区","望花区","顺城区","抚顺县","新宾满族自治县","清原满族自治县"],"本溪":["平山区","溪湖区","明山区","南芬区","本溪满族自治县","桓仁满族自治县"],"丹东":["元宝区","振兴区","振安区","宽甸满族自治县","东港","凤城"],"锦州":["古塔区","凌河区","太和区","黑山县","义县","凌海","北宁"],"营口":["站前区","西区","鲅鱼圈区","老边区","盖州","大石桥"],"阜新":["海州区","新邱区","太平区","清河门区","细河区","阜新蒙古族自治县","彰武县"],"辽阳":["白塔区","文圣区","宏伟区","弓长岭区","太子河区","辽阳县","灯塔"],"盘锦":["双台子区","兴隆台区","大洼县","盘山县"],"铁岭":["银州区","清河区","铁岭县","西丰县","昌图县","调兵山","开原"],"朝阳":["双塔区","龙城区","朝阳县","建平县","喀喇沁左翼蒙古族自治县","北票","凌源"],"葫芦岛":["连山区","龙港区","南票区","绥中县","建昌县","兴城"]},"吉林":{"长春":["南关区","宽城区","朝阳区","二道区","绿园区","双阳区","农安县","九台","榆树","德惠"],"吉林":["昌邑区","龙潭区","船营区","丰满区","永吉县","蛟河","桦甸","舒兰","磐石"],"四平":["铁西区","铁东区","梨树县","伊通满族自治县","公主岭","双辽"],"辽源":["龙山区","西安区","东丰县","东辽县"],"通化":["东昌区","二道江区","通化县","辉南县","柳河县","梅河口","集安"],"白山":["八道江区","抚松县","靖宇县","长白朝鲜族自治县","江源县","临江"],"松原":["宁江区","前郭尔罗斯蒙古族自治县","长岭县","乾安县","扶余县"],"白城":["洮北区","镇赉县","通榆县","洮南","大安"],"延边朝鲜族自治州":["延吉","图们","敦化","珲春","龙井","和龙","汪清县","安图县"]},"黑龙江":{"哈尔滨":["道里区","南岗区","道外区","香坊区","动力区","平房区","松北区","呼兰区","依兰县","方正县","宾县","巴彦县","木兰县","通河县","延寿县","阿城","双城","尚志","五常"],"齐齐哈尔":["龙沙区","建华区","铁锋区","昂昂溪区","富拉尔基区","碾子山区","梅里斯达斡尔族区","龙江县","依安县","泰来县","甘南县","富裕县","克山县","克东县","拜泉县","讷河"],"鸡西":["鸡冠区","恒山区","滴道区","梨树区","城子河区","麻山区","鸡东县","虎林","密山"],"鹤岗":["向阳区","工农区","南山区","兴安区","东山区","兴山区","萝北县","绥滨县"],"双鸭山":["尖山区","岭东区","四方台区","宝山区","集贤县","友谊县","宝清县","饶河县"],"大庆":["萨尔图区","龙凤区","让胡路区","红岗区","大同区","肇州县","肇源县","林甸县","杜尔伯特蒙古族自治县"],"伊春":["伊春区","南岔区","友好区","西林区","翠峦区","新青区","美溪区","金山屯区","五营区","乌马河区","汤旺河区","带岭区","乌伊岭区","红星区","上甘岭区","嘉荫县","铁力"],"佳木斯":["永红区","向阳区","前进区","东风区","郊区","桦南县","桦川县","汤原县","抚远县","同江","富锦"],"七台河":["新兴区","桃山区","茄子河区","勃利县"],"牡丹江":["东安区","阳明区","爱民区","西安区","东宁县","林口县","绥芬河","海林","宁安","穆棱"],"黑河":["爱辉区","嫩江县","逊克县","孙吴县","北安","五大连池"],"绥化":["北林区","望奎县","兰西县","青冈县","庆安县","明水县","绥棱县","安达","肇东","海伦"],"大兴安岭地区":["呼玛县","塔河县","漠河县"]},"海南":{"海口":["秀英区","龙华区","琼山区","美兰区"],"三亚":["三亚"],"直辖县级行政单位":["五指山","琼海","儋州","文昌","万宁","东方","定安县","屯昌县","澄迈县","临高县","白沙黎族自治县","昌江黎族自治县","乐东黎族自治县","陵水黎族自治县","保亭黎族苗族自治县","琼中黎族苗族自治县","西沙群岛","南沙群岛","中沙群岛的岛礁及其海域"]}};

		$scope.changeClr=function (){
			$scope.provifn();
			if($scope.address.province){
				$(".provincesty").removeClass("baseclr");
			}else{
				$(".provincesty").addClass("baseclr");
			}
			$scope.address.city='';
			$scope.address.district='';
			$(".citysty").addClass("baseclr");
			$(".districtsty").addClass("baseclr");
		}
		
		$scope.changeClr2=function (){
			$scope.citfn();
			if($scope.address.city){
				$(".citysty").removeClass("baseclr");
			}else{
				$(".citysty").addClass("baseclr");
			}
			$scope.address.district='';
		}
		
		$scope.changeClr3=function (){
			$scope.distrfn();
			if($scope.address.district){
				$(".districtsty").removeClass("baseclr");
			}else{
				$(".districtsty").addClass("baseclr");
			}
		}
		
		//亲人关系
		Restangular.all('wallet/faceVisa/getDictionary').post({'regType':265,'token':USER_CONFIG.customer.token}).then(function (response){
			if(response.list&&response.list.length>0){
				$scope.relativer=response.list;
			}
		});
		//其他或者紧急联系人关系
		Restangular.all('wallet/faceVisa/getDictionary').post({'regType':396,'token':USER_CONFIG.customer.token}).then(function (response){
			if(response.list&&response.list.length>0){
				$scope.others=response.list;
			}
		});
		
		$scope.relastyfn=function (){
			$scope.homerelafn();
			if($scope.homeContact.relationship){
				$(".familysty").removeClass("baseclr");
			}else{
				$(".familysty").addClass("baseclr");
			}
		}
		
		$scope.relastyfn2=function (){
			$scope.urgerelafn();
			if($scope.urgentContact.relationship){
				$(".urgensty").removeClass("baseclr");
			}else{
				$(".urgensty").addClass("baseclr");
			}
		}
		
		$scope.relastyfn3=function (){
			if($scope.otherContact.relationship){
				$(".othersty").removeClass("baseclr");
			}else{
				$(".othersty").addClass("baseclr");
			}
		}
		
		var phonereg=/^[1]{1}\d{10}$/;
		$scope.address={};
		$scope.provifn=function (){
			if(!$scope.address.province){
				$scope.provinsty=true;
				return false;
			}else{
				$scope.provinsty=false;
				return true;
			}
		}
		$scope.citfn=function (){
			if(!$scope.address.city){
				$scope.ctsty=true;
				return false;
			}else{
				$scope.ctsty=false;
				return true
			}
		}
		$scope.distrfn=function (){
			if(!$scope.address.district){
				$scope.distrsty=true;
				return false;
			}else{
				$scope.distrsty=false;
				return true;
			}
		}
		$scope.detafn=function (){
			if(!$scope.address.detail){
				$scope.detailsty=true;
				return false;
			}else{
				$scope.detailsty=false;
				return true;
			}
		}
		$scope.homenamefn=function (){
			if(!$scope.homeContact.name){
				$scope.faminamesty=true;
				return false;
			}else{
				$scope.faminamesty=false;
				return true;
			}
		}
		$scope.homerelafn=function (){
			if(!$scope.homeContact.relationship){
				$scope.famirelasty=true;
				return false;
			}else{
				$scope.famirelasty=false;
				return true;
			}
		}
		$scope.homephonefn=function (){
			if(!$scope.homeContact.phone||!phonereg.test($scope.homeContact.phone)){
				$scope.famiphonesty=true;
				return false;
			}else{
				$scope.famiphonesty=false;
				return true;
			}
		}
		$scope.urgenamefn=function (){
			if(!$scope.urgentContact.name){
				$scope.urgenamesty=true;
				return false;
			}else{
				$scope.urgenamesty=false;
				return true;
			}
		}
		$scope.urgerelafn=function (){
			if(!$scope.urgentContact.relationship){
				$scope.urgerelasty=true;
				return false;
			}else{
				$scope.urgerelasty=false;
				return true;
			}
		}
		$scope.urgephonefn=function (){
			if(!$scope.urgentContact.phone||!phonereg.test($scope.urgentContact.phone)){
				$scope.urgephonesty=true;
				return false;
			}else{
				$scope.urgephonesty=false;
				return true;
			}
		}
		$scope.otherphonefn=function (){
			if($scope.otherContact.phone&&!phonereg.test($scope.otherContact.phone)){
				$scope.othephonesty=true;
				return false;
			}else{
				$scope.othephonesty=false;
				return true;
			}
		}
		var weLiveAddres={};
		$scope.nextgo=function (){
			
			$scope.provifn();
			$scope.citfn();
			$scope.distrfn();
			$scope.detafn();
			$scope.homenamefn();
			$scope.homerelafn();
			$scope.homephonefn();
			$scope.urgenamefn();
			$scope.urgerelafn();
			$scope.urgephonefn();
			
			if($scope.provifn()&&$scope.citfn()&&$scope.distrfn()&&$scope.detafn()&&$scope.homenamefn()&&$scope.homerelafn()&&$scope.homephonefn()&&$scope.urgenamefn()&&$scope.urgerelafn()&&$scope.urgephonefn()){
			
				weLiveAddres.province=$scope.address.province;
				weLiveAddres.city=$scope.address.city;
				weLiveAddres.region=$scope.address.district;
				weLiveAddres.address=$scope.address.detail;
				
				let data = {
					'contacts': {
						'home': $scope.homeContact,
						'urgent': $scope.urgentContact,
						'other': $scope.otherContact
					},
					'weLive': weLiveAddres
				};
    		
				localStorageService.set('person', JSON.stringify(data));
				
				$state.go("signApp.identity");
			}
			
			
			
		}
		
//		console.info( JSON.parse( localStorageService.get('basic') ) );
//		console.info(USER_CONFIG);
//		console.log($location.search());
    });
}