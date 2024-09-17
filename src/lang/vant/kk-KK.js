var stdin_default = {
  name: "Аты",
  tel: "Телефон",
  save: "Сақтау",
  clear: "Тазалау",
  cancel: "Бас тарту",
  confirm: "Растау",
  delete: "Жою",
  loading: "Жүктелуде...",
  noCoupon: "Купон жоқ",
  nameEmpty: "Аты-жөніңізді толтырыңыз",
  addContact: "Байланыс қосу",
  telInvalid: "Телефон нөмірі жарамсыз",
  vanCalendar: {
    end: "аяқтау",
    start: "Бастау",
    title: "Күнтізбе",
    weekdays: ["Жексенбі", "Дүйсенбі", "Сейсенбі", "Сәрсенбі", "Бейсенбі", "Жұма", "Сенбі"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Көбіне ${maxRange} күн таңдаңыз`
  },
  vanCascader: {
    select: "Таңдау"
  },
  vanPagination: {
    prev: "Алдыңғы",
    next: "Келесі"
  },
  vanPullRefresh: {
    pulling: "Жаңарту үшін тартыңыз...",
    loosing: "Жаңарту үшін босатыңыз..."
  },
  vanSubmitBar: {
    label: "Жалпы:"
  },
  vanCoupon: {
    unlimited: "Шектеусіз",
    discount: (discount) => `${discount * 10}% жеңілдік`,
    condition: (condition) => `Кемінде ${condition}`
  },
  vanCouponCell: {
    title: "Купон",
    count: (count) => `Сізде ${count} купон бар.`
  },
  vanCouponList: {
    exchange: "Айырбастау",
    close: "Жабу",
    enable: "Қолжетімді",
    disabled: "Жоқ",
    placeholder: "Купон коды"
  },
  vanAddressEdit: {
    area: "Аудан",
    areaEmpty: "Алушының ауданын таңдаңыз",
    addressEmpty: "Мекенжай бос болмауы керек",
    addressDetail: "Мекенжай",
    defaultAddress: "Әдепкі мекенжай ретінде орнату"
  },
  vanAddressList: {
    add: "Жаңа мекенжай қосу"
  }
};
export {
  stdin_default as default
};