<?php
class PortalModel extends AbstractDataModel {
  function listServerGroups() {
    $qry = "SELECT s.name, s.isSystemGroup, s.serverGroupId, r.companyName " .
           "FROM serverGroup s LEFT JOIN reseller r ON s.resellerId=r.resellerId";

    $dataResource = mysqli_query($this->get_dbh_portal(), $qry);
    return $this->convert_to_array2($dataResource);
  }

  function getAllServers() {
    $serverGroupId = mysqli_real_escape_string($this->get_dbh_portal(), $serverGroupId);
    $qry = "SELECT s.serverId, s.hostname, s.serverTypeId, s.serverStatus, p.name " .
           "FROM server s JOIN voipPlatform p ON s.platformId=p.voipPlatformId";

    $dataResource = mysqli_query($this->get_dbh_portal(), $qry);
    return $this->convert_to_array2($dataResource);
  }

  function listServersInGroup($serverGroupId) {
    $serverGroupId = mysqli_real_escape_string($this->get_dbh_portal(), $serverGroupId);
    $qry = "SELECT s.serverId, s.hostname, s.serverTypeId, s.serverStatus, p.name " .
           "FROM server s JOIN voipPlatform p ON s.platformId=p.voipPlatformId " .
           "WHERE s.serverGroupId=" . $serverGroupId;

    $dataResource = mysqli_query($this->get_dbh_portal(), $qry);
    return $this->convert_to_array2($dataResource);
  }
}
