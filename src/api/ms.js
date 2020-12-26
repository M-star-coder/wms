import request from "@/utils/request";
import qs from "qs";

/** * 基础数据 ***/

// /basicData/store/list  仓库列表
export function storeList(params) {
  return request({
    url: "/api/wms/warehouse/list",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/store/add  公司列表
export function companyList(params) {
  return request({
    url: "/api/wms/warehouse/selectCompany",
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/store/add  部门列表
export function departmentList(params) {
  return request({
    url: `/api/wms/warehouse/selectDepartment/${params.companyCode}`,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/store/add  人员列表
export function staffList(params) {
  return request({
    url: `/api/wms/warehouse/getUserListForIMByDeptId/${params.deptId}`,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/store/add  仓库新增
export function storeAdd(params) {
  return request({
    url: "/api/wms/warehouse/insert",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/store/detail  仓库详情
export function storeDetail(params) {
  return request({
    url: `/api/wms/warehouse/select/${params.warehouseCode}`,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/store/add  仓库编辑
export function storeEdit(params) {
  return request({
    url: "/api/wms/warehouse/update",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/store/list  仓库删除
export function storeDelete(params) {
  return request({
    url: "/api/wms/warehouse/delete",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /basicData/storeType/list  仓库类型列表
export function storeTypeList(params) {
  return request({
    url: "/api/wms/category/list",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeType/add  权限列表
export function allAuthorityList(params) {
  return request({
    url: "/api/wms/category/allAuthority",
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeType/add  仓库类型新增
export function storeTypeAdd(params) {
  return request({
    url: "/api/wms/category/insert",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeType/detail  仓库类型详情
export function storeTypeDetail(params) {
  return request({
    url: `/api/wms/category/select/${params.categoryCode}`,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeType/add  仓库类型编辑
export function storeTypeEdit(params) {
  return request({
    url: "/api/wms/category/update",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeType/list  仓库类型删除
export function storeTypeDelete(params) {
  return request({
    url: "/api/wms/category/delete",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeArea/list  库区列表
export function storeAreaList(params) {
  return request({
    url: "/api/wms/zone/list",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeArea/add  库区新增
export function storeAreaAdd(params) {
  return request({
    url: "/api/wms/zone/insert",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeArea/detail  库区详情
export function storeAreaDetail(params) {
  return request({
    url: `/api/wms/zone/select/${params.zoneCode}`,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeArea/add  库区编辑
export function storeAreaEdit(params) {
  return request({
    url: "/api/wms/zone/update",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeArea/list  库区删除
export function storeAreaDelete(params) {
  return request({
    url: "/api/wms/zone/delete",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeLocation/list  库位列表
export function storeLocationList(params) {
  return request({
    url: "/api/wms/location/list",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeLocation/add  库位新增
export function storeLocationAdd(params) {
  return request({
    url: "/api/wms/location/insert",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeLocation/detail  库位详情
export function storeLocationDetail(params) {
  return request({
    url: `/api/wms/location/select/${params.locationCode}`,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeLocation/add  库位编辑
export function storeLocationEdit(params) {
  return request({
    url: "/api/wms/location/update",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/storeLocation/list  库位删除productTypeList
export function storeLocationDelete(params) {
  return request({
    url: "/api/wms/location/delete",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/product/list  产品分类列表
export function productTypeList(params) {
  return request({
    url: "/api/wms/currentStock/getProductCategoryTreeData",
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/product/list  产品列表
export function productList(params) {
  return request({
    url: "/api/wms/currentStock/list",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/product/detail  产品详情
export function productDetail(params) {
  return request({
    url: `/api/wms/currentStock/select/${params.productCode}`,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/product/edit  产品编辑
export function productEdit(params) {
  return request({
    url: "/api/wms/currentStock/update",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/product/detail  产品明细
export function productDetailList(params) {
  return request({
    url: "/api/wms/currentStockDetail/list",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/supplier/list  供应商列表
export function supplierList(params) {
  return request({
    url: "/api/wms/supplier/list",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/supplier/list  供应商详情
export function supplierDetail(params) {
  return request({
    url: `/api/wms/supplier/select/${params.companyCode}`,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/customer/list  客户列表
export function customerList(params) {
  return request({
    url: "/api/wms/customer/list",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
// /basicData/customer/list  客户详情
export function customerDetail(params) {
  return request({
    url: `/api/wms/customer/select/${params.companyCode}`,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /inStock/produce/pc/selectProduceSliceGrn 获取生产切片入库单集合
export function warehouseList(params) {
  return request({
    url: "/api/wms/inStock/produce/pc/selectProduceSliceGrn",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /outStock/list出库单列表
export function outStockList(params) {
  return request({
    url: "/api/wms/outStock/list",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /outStock/get/{outStockCode}出库单详情
export function outStockGet(params) {
  return request({
    url: `/api/wms/outStock/get/${params.outStockCode}`,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// 获取相关的字典
export function listDictData(params) {
  return request({
    url: "/api/wms/dataDictionary/getDataByTypes?dictTypes=" + params,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

/// outStock/update 修改出库单备注
export function outStockUpdate(params) {
  return request({
    url: "/api/wms/outStock/update",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /inStock/produce/pc/selectProduceFilmGrn 获取生产薄膜入库单集合
export function selectProduceFilmGrn(params) {
  return request({
    url: "/api/wms/inStock/produce/pc/selectProduceFilmGrn",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /inStock/produce/pc/selectGrnInfo/{grnCode} 获取生产入库单信息
export function warehouseGrnInfo(params) {
  return request({
    url: "/api/wms/inStock/produce/pc/selectGrnInfo/" + params.grnCode,
    method: "get",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /inStock/produce/pc/selectFilmProduceISReceiptDetail 获取薄膜生产入库收货产品明细
export function selectFilmProduceISReceiptDetail(params) {
  return request({
    url: "/api/wms/inStock/produce/pc/selectFilmProduceISReceiptDetail",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /inStock/produce/pc/selectProduceGrn获取生产入库单明细
export function selectProduceGrnDetail(params) {
  return request({
    url: "/api/wms/inStock/produce/pc/selectProduceGrn",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /inStock/produce/pc/selectFilmProduceISWaitSplitList/获取生产入库单待拆分明细
export function stockSplitData(params) {
  return request({
    url: "/api/wms/inStock/produce/pc/selectFilmProduceISWaitSplitList",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /inStock/produce/pc/grnSplit入库单拆分
export function stockGrnSplit(params) {
  return request({
    url: "/api/wms/inStock/produce/pc/grnSplit",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /currentStockDetail/productDetailList 产品明细列表
export function productStockDetailList(params) {
  return request({
    url: "/api/wms/currentStockDetail/productDetailList",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /inStock/produce/pc/saveSliceGrn 保存切片生产入库单（编辑、新增）
export function saveSliceGrn(params) {
  return request({
    url: "/api/wms/inStock/produce/pc/saveSliceGrn",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}

// /inStock/produce/pc/deleteSliceGrn 删除切片生产入库单
export function deleteSliceGrn(params) {
  return request({
    url: "/api/wms/inStock/produce/pc/deleteSliceGrn",
    method: "post",
    headers: {
      Authorization: sessionStorage.getItem("Authorization"),
      authority: sessionStorage.getItem("authorityLeft"),
    },
    data: params,
  });
}
